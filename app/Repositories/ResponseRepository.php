<?php

namespace App\Repositories;

use App\Models\Response;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class ResponseRepository implements RepositoryInterface
{
    public function __construct(
        public Response $response
    ) {}

    public function getAll(): Collection
    {
        return $this->response->all();
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
        $avg = $this->response->query();
        $driver = DB::connection()->getDriverName();

        $castExpression = match ($driver) {
            'pgsql' => 'AVG(answer::int)',
            'mysql' => 'AVG(CAST(answer AS UNSIGNED))',
            default => 'AVG(CAST(answer AS UNSIGNED))',
        };

        if ($gender === 'Semua' || $gender === null) {
            return [
                'avg' => $avg->select(DB::raw($castExpression))->value('avg'),
                'count' => $avg->select('respondent_id')->groupBy('respondent_id')->get()->count(),
            ];
        }

        return [
            'avg' => $avg->whereRelation('respondent', 'gender', $gender)->select(DB::raw($castExpression))->value('avg'),
            'count' => $avg->whereRelation('respondent', 'gender', $gender)->select('respondent_id')->groupBy('respondent_id')->get()->count(),
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
        // Darker colors for each scale
        $colors = [
            1 => '#8B0000', // Dark Red
            2 => '#FF8C00', // Dark Orange
            3 => '#FFD700', // Gold
            4 => '#556B2F', // Dark Olive Green
            5 => '#006400', // Dark Green
        ];

        $nameMap = [
            1 => 'Tidak Puas',
            2 => 'Kurang Puas',
            3 => 'Cukup Puas',
            4 => 'Puas',
            5 => 'Sangat Puas',
        ];

        $query = $this->response->query();

        if ($gender !== 'Semua' && $gender !== null) {
            $query->whereRelation('responses.respondent', 'gender', $gender);
        }

        $distribution = $query
            ->select('answer', DB::raw('COUNT(*) as count'))
            ->groupBy('answer')
            ->get();

        $totalResponses = $distribution->sum('count');

        $result = [];
        foreach (range(1, 5) as $scale) {
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
            $query->whereRelation('responses.respondent', 'gender', $gender);
        }

        return $query->count();
    }

    public function monthlySatisfactionTrend(string|array|null $gender): array
    {
        $year = now()->year;

        $query = $this->response->query();

        if ($gender !== 'Semua' && $gender !== null) {
            $query->whereRelation('responses.respondent', 'gender', $gender);
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
        // Get the current date and calculate the starting date for 6 months back
        $endDate = now();
        $startDate = $endDate->copy()->subMonths(5);

        $query = $this->response->query();

        if ($gender !== 'Semua' && $gender !== null) {
            $query->whereRelation('responses.respondent', 'gender', $gender);
        }

        $avgSatisfactionQuery = DB::getDriverName() === 'pgsql'
            ? 'ROUND(CAST(AVG(CAST(answer AS FLOAT)) AS NUMERIC), 2)'  // PostgreSQL syntax with explicit numeric cast
            : 'ROUND(AVG(CAST(answer AS SIGNED)), 2)'; // MySQL syntax

        $monthQuery = DB::getDriverName() === 'pgsql'
            ? 'EXTRACT(MONTH FROM created_at)'         // PostgreSQL syntax
            : 'MONTH(created_at)';                     // MySQL syntax

        $trendData = $query
            ->select(
                DB::raw("$monthQuery as month"),
                DB::raw("$avgSatisfactionQuery as avg_satisfaction")
            )
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Prepare the result array with the past 6 months
        $monthlyTrend = [];
        for ($monthOffset = 0; $monthOffset < 6; $monthOffset++) {
            $month = $startDate->copy()->addMonths($monthOffset)->month;
            $monthlyTrend[$month] = [
                'name' => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][$month - 1],
                'price' => 0,
            ];
        }

        // Populate with actual data from the query
        foreach ($trendData as $data) {
            $monthlyTrend[$data->month]['price'] = $data->avg_satisfaction;
        }

        // Convert to a sorted array by month for the frontend
        return array_values($monthlyTrend);
    }
}
