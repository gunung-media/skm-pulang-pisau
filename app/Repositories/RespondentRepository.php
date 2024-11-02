<?php

namespace App\Repositories;

use App\Models\Respondent;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class RespondentRepository implements RepositoryInterface
{
    public function __construct(
        public Respondent $respondent
    ) {}

    public function getAll(): Collection
    {
        return $this->respondent->all();
    }

    public function findById($id): ?Respondent
    {
        return $this->respondent->find($id);
    }

    public function create(array $data): Respondent
    {
        return $this->respondent->create($data);
    }

    public function update($id, array $data): ?Respondent
    {
        $respondent = $this->respondent->find($id);
        $respondent->update($data);
        return $respondent;
    }

    public function delete($id): void
    {
        $respondent = $this->respondent->find($id);
        $respondent->delete();
    }

    public function paginate($perPage = 15): LengthAwarePaginator
    {
        return $this->respondent->paginate($perPage);
    }

    public function findByAttributes(array $attributes): Collection
    {
        return $this->respondent->where($attributes)->get();
    }

    public function exists(array $attributes): bool
    {
        return $this->respondent->where($attributes)->exists();
    }
}
