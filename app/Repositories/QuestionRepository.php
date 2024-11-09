<?php

namespace App\Repositories;

use App\Models\Question;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class QuestionRepository implements RepositoryInterface
{
    public function __construct(
        public Question $question
    ) {}

    public function getAll(): Collection
    {
        return $this->question->all();
    }

    public function getActive(): Collection
    {
        return $this->question
            ->where('is_active', true)
            ->get();
    }

    public function findById($id): ?Question
    {
        return $this->question->find($id);
    }

    public function create(array $data): Question
    {
        return $this->question->create($data);
    }

    public function update($id, array $data): ?Question
    {
        $question = $this->question->find($id);
        $question->update($data);
        return $question;
    }

    public function delete($id): void
    {
        $question = $this->question->find($id);
        $question->delete();
    }

    public function paginate($perPage = 15): LengthAwarePaginator
    {
        return $this->question->paginate($perPage);
    }

    public function findByAttributes(array $attributes): Collection
    {
        return $this->question->where($attributes)->get();
    }

    public function exists(array $attributes): bool
    {
        return $this->question->where($attributes)->exists();
    }

    public function ranking(string|null $gender): array
    {
        $query = $this->question->query();

        if ($gender !== 'Semua' && $gender !== null) {
            $query->whereRelation('responses.respondent', 'gender', $gender);
        }

        return $query
            ->get()
            ->map(fn($question) => $question->append('index_satisfaction'))
            ->sortByDesc('index_satisfaction')
            ->values() // Reset keys after sorting
            ->toArray();
    }
}
