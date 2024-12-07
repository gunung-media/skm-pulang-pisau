<?php

namespace App\Repositories;

use App\Models\Response;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class ResponseRepository implements RepositoryInterface
{
    public function __construct(
        public Response $response,
        protected RespondentRepository $respondentRepository,
        protected QuestionRepository $questionRepository,
    ) {}

    public function getAll(): Collection
    {
        return $this->response
            ->get();
    }

    public function findById($id): ?Response
    {
        return $this->response->find($id);
    }

    public function create(array $data): Response
    {
        return $this->response->create($data);
    }

    public function update($id, array $data): ?Response
    {
        $response = $this->response->find($id);
        $response->update($data);
        return $response;
    }

    public function delete($id): void
    {
        $response = $this->response->find($id);
        $response->delete();
    }

    public function paginate($perPage = 15): LengthAwarePaginator
    {
        return $this->response->paginate($perPage);
    }

    public function findByAttributes(array $attributes): Collection
    {
        return $this->response->where($attributes)->get();
    }

    public function exists(array $attributes): bool
    {
        return $this->response->where($attributes)->exists();
    }

    public function avgSatisfaction(string|null $gender): array
    {
        $query = $this->response->query();

        $driver = DB::connection()->getDriverName();

        $castExpression = match ($driver) {
            'pgsql' => 'avg(answer::int) as avg',
            'mysql' => 'avg(cast(answer AS UNSIGNED)) as avg',
            default => 'avg(cast(answer AS UNSIGNED)) as avg',
        };

        if ($gender !== 'Semua' && $gender !== null) {
            $query->whereRelation('respondent', 'gender', $gender);
        }

        $avg = $query->select(DB::raw($castExpression))->value('avg');
        $count = $query->distinct('respondent_id')->count('respondent_id');

        return [
            'avg' => $avg ?? 0,
            'count' => $count,
        ];
    }

    public function answerDistributionPerQuestion(string|array|null $gender): array
    {
        $query = $this->response->query();

        if ($gender !== 'Semua' && $gender !== null) {
            $query->whereRelation('responses.respondent', 'gender', $gender);
        }

        $distribution = $query
            ->select('question_id', 'answer', DB::raw('COUNT(*) as count'))
            ->groupBy('question_id', 'answer')
            ->get();

        $totalResponsesPerQuestion = $distribution
            ->groupBy('question_id')
            ->map(fn($responses) => $responses->sum('count'));

        $result = [];
        foreach ($distribution->groupBy('question_id') as $questionId => $answers) {
            $totalResponses = $totalResponsesPerQuestion[$questionId];

            $scales = [];
            foreach (range(1, 5) as $scale) {
                $count = $answers->firstWhere('answer', $scale)->count ?? 0; // Get count or 0 if no responses for this scale
                $percentage = $totalResponses > 0 ? ($count / $totalResponses) * 100 : 0;
                $scales[] = [
                    'scale' => $scale,
                    'count' => $count,
                    'percentage' => round($percentage, 2),
                ];
            }

            $result[$questionId] = [
                'question_id' => $questionId,
                'distribution' => $scales,
            ];
        }

        return $result;
    }

    public function answerDistribution(string|array|null $gender): array
    {
        $colors = [
            1 => '#8B0000',
            2 => '#FF8C00',
            3 => '#556B2F',
            4 => '#006400',
        ];

        $nameMap = [
            1 => 'Tidak Puas',
            2 => 'Kurang Puas',
            3 => 'Puas',
            4 => 'Sangat Puas',
        ];

        $query = $this->response->query();

        if ($gender !== 'Semua' && $gender !== null) {
            $query->whereRelation('respondent', 'gender', $gender);
        }

        $distribution = $query
            ->select('answer', DB::raw('COUNT(*) as count'))
            ->groupBy('answer')
            ->get();

        $totalResponses = $distribution->sum('count');

        $result = [];
        foreach (range(1, 4) as $scale) {
            $count = $distribution->firstWhere('answer', $scale)->count ?? 0;
            $percentage = $totalResponses > 0 ? ($count / $totalResponses) * 100 : 0;
            $result[] = [
                'name' => $nameMap[$scale],
                'value' => $count,
                'color' => $colors[$scale],
                'percentage' => round($percentage, 2),
            ];
        }

        return $result;
    }

    public function count(string|array|null $gender)
    {
        $query = $this->response->query();

        if ($gender !== 'Semua' && $gender !== null) {
            $query->whereRelation('respondent', 'gender', $gender);
        }

        return $query->count();
    }

    public function monthlySatisfactionTrend(string|array|null $gender): array
    {
        $year = now()->year;

        $query = $this->response->query();

        if ($gender !== 'Semua' && $gender !== null) {
            $query->whereRelation('respondent', 'gender', $gender);
        }

        $trendData = $query
            ->select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('ROUND(AVG(answer), 2) as avg_satisfaction')
            )
            ->whereYear('created_at', $year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $monthlyTrend = [];
        for ($month = 1; $month <= 12; $month++) {
            $monthlyTrend[$month] = [
                'month' => $month,
                'avg_satisfaction' => 0,
            ];
        }

        foreach ($trendData as $data) {
            $monthlyTrend[$data->month]['avg_satisfaction'] = $data->avg_satisfaction;
        }

        return array_values($monthlyTrend);
    }

    public function sixMonthSatisfactionTrend(string|array|null $gender): array
    {
        $endDate = now();
        $startDate = $endDate->copy()->subMonths(5);

        $query = $this->response->query();

        if ($gender !== 'Semua' && $gender !== null) {
            $query->whereRelation('respondent', 'gender', $gender);
        }

        $avgSatisfactionQuery = DB::getDriverName() === 'pgsql'
            ? 'ROUND(CAST(AVG(CAST(answer AS FLOAT)) AS NUMERIC), 2)'
            : 'ROUND(AVG(CAST(answer AS SIGNED)), 2)';

        $monthQuery = DB::getDriverName() === 'pgsql'
            ? 'EXTRACT(MONTH FROM created_at)'
            : 'MONTH(created_at)';

        $trendData = $query
            ->select(
                DB::raw("$monthQuery as month"),
                DB::raw("$avgSatisfactionQuery as avg_satisfaction")
            )
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $monthlyTrend = [];
        for ($monthOffset = 0; $monthOffset < 6; $monthOffset++) {
            $month = $startDate->copy()->addMonths($monthOffset)->month;
            $monthlyTrend[$month] = [
                'name' => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][$month - 1],
                'price' => 0,
            ];
        }

        foreach ($trendData as $data) {
            $monthlyTrend[$data->month]['price'] = $data->avg_satisfaction;
        }

        return array_values($monthlyTrend);
    }


    public function findByAttributesWhereBetween(
        array $attributes = [],
        array $whereBetween = [],
        bool $paginate = false
    ): Collection | LengthAwarePaginator {
        $query =  $this->response
            ->with(['question', 'respondent'])
            ->orderBy('created_at', 'desc');

        if (!empty($attributes)) {
            $query->whereRelation('respondent', $attributes);
        }
        if (!empty($whereBetween) && count($whereBetween) === 2) {
            $query->whereBetween('created_at', $whereBetween);
        }

        return $paginate ? $query->paginate(10) : $query->get();
    }

    public function report(
        array $attributes = [],
        array $whereBetween = [],
    ): array {
        $query =  $this->response
            ->with(['question', 'respondent'])
            ->orderBy('created_at', 'desc');

        if (!empty($attributes)) {
            $query->whereRelation('respondent', $attributes);
        }
        if (!empty($whereBetween) && count($whereBetween) === 2) {
            $query->whereBetween('created_at', $whereBetween);
        }

        $totalRespondent = $this->respondentRepository->count();
        $totalQuestion = $this->questionRepository->count();
        $perQuestionResponses = $query->get()->groupBy('question_id')->toArray();

        $counting = [];
        $sumIndex = 0;


        foreach ($perQuestionResponses as $key => $value) {
            $value = collect($value);
            $sumPerQuestion = $value->sum('answer');
            $averagePerQuestion = $sumPerQuestion / $totalRespondent;
            $indexPerQuestion = $averagePerQuestion / $totalQuestion;
            $counting[$key] = [
                'sum' => $sumPerQuestion,
                'average' => $averagePerQuestion,
                'index' => $indexPerQuestion
            ];
            $sumIndex += $indexPerQuestion;
        }

        return [
            'sumIndex' => $sumIndex,
            'counting' => $counting,
            'performance' =>      $sumIndex >= 88.31 ? "Sangat Baik"
                : ($sumIndex >= 76.61 ? "Baik"
                    : ($sumIndex >= 65.00 ? "Kurang Baik" : "Tidak Baik"))

        ];
    }
}
