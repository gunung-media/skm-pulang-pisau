<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Respondent extends Model
{
    protected $fillable = [
        'name',
        'gender',
        'education',
        'age',
        'jobs',
        'type_of_service',
    ];

    public function responses(): HasMany
    {
        return $this->hasMany(Response::class);
    }
}
