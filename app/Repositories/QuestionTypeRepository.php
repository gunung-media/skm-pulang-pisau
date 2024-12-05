<?php

namespace App\Repositories;

use App\Models\QuestionType;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class QuestionTypeRepository implements RepositoryInterface
{
    public function __construct(
        public QuestionType $questionType
    ) {}

    public function getAll(): Collection
    {
        return $this->questionType
            ->all();
    }

    public function findById($id): ?QuestionType
    {
        return $this->questionType
            ->find($id);
    }

    public function create(array $data): QuestionType
    {
        return $this->questionType
            ->create($data);
    }

    public function update($id, array $data): ?QuestionType
    {
        $questionType = $this->questionType->find($id);
        $questionType->update($data);
        return $questionType;
    }

    public function delete($id): void
    {
        $questionType = $this->questionType->find($id);
        $questionType->delete();
    }

    public function paginate($perPage = 15): LengthAwarePaginator
    {
        return $this->questionType
            ->paginate($perPage);
    }

    public function findByAttributes(array $attributes): Collection
    {
        return $this->questionType
            ->where($attributes)
            ->get();
    }

    public function exists(array $attributes): bool
    {
        return $this->questionType
            ->where($attributes)
            ->exists();
    }
}
