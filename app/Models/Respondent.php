<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

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

    protected $appends = ['index_satisfaction'];

    public function responses(): HasMany
    {
        return $this->hasMany(Response::class);
    }

    protected function indexSatisfaction(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->responses()->selectRaw('avg(answer::int) as average')->value('average'),
        );
    }
}
