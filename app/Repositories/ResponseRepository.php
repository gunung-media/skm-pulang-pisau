<?php

namespace App\Repositories;

use App\Models\Response;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

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
}
