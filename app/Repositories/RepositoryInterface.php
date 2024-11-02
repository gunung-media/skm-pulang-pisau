<?php

namespace App\Repositories;

interface RepositoryInterface
{
    /**
     * Get all records.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAll();

    /**
     * Find a record by its ID.
     *
     * @param  int  $id
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function findById($id);

    /**
     * Create a new record.
     *
     * @param  array  $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function create(array $data);

    /**
     * Update a record by its ID.
     *
     * @param  int  $id
     * @param  array  $data
     * @return bool
     */
    public function update($id, array $data);

    /**
     * Delete a record by its ID.
     *
     * @param  int  $id
     * @return bool
     */
    public function delete($id);

    /**
     * Get paginated records.
     *
     * @param  int  $perPage
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginate($perPage = 15);

    /**
     * Find records by specific attributes.
     *
     * @param  array  $attributes
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function findByAttributes(array $attributes);

    /**
     * Check if a record exists by specific attributes.
     *
     * @param  array  $attributes
     * @return bool
     */
    public function exists(array $attributes);
}
