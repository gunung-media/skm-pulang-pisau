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
            'pgsql' => 'AVG(CAST(answer AS INTEGER))',
            'mysql' => 'AVG(CAST(answer AS SIGNED))',
            default => 'AVG(CAST(answer AS INT))',
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
}
