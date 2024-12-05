<?php

namespace App\Repositories;

use App\Models\Service;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ServiceRepository implements RepositoryInterface
{
    public function __construct(
        protected Service $service
    ) {}

    public function getAll(): Collection
    {
        return $this->service->all();
    }

    public function findById($id): ?Service
    {
        return $this->service->find($id);
    }

    public function create(array $data): Service
    {
        return $this->service->create($data);
    }

    public function update($id, array $data): Service
    {
        $service = $this->service->where('id', $id);
        $service->update($data);
        return $service;
    }

    public function delete($id): void
    {
        $service = $this->service->where('id', $id);
        $service->delete();
    }

    public function paginate($perPage = 15): LengthAwarePaginator
    {
        return $this->service->paginate($perPage);
    }

    public function findByAttributes(array $attributes): Collection
    {
        return $this->service->where($attributes)->get();
    }

    public function exists(array $attributes): bool
    {
        return $this->service->where($attributes)->exists();
    }
}
