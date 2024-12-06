<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
        'service_id',
        'suggestion'
    ];

    protected $appends = ['index_satisfaction'];

    protected $with = ['service'];

    public function responses(): HasMany
    {
        return $this->hasMany(Response::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    protected function indexSatisfaction(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->responses()->selectRaw(
                app('db')->getDriverName() === 'pgsql'
                    ? 'avg(answer::int) as average'
                    : 'avg(cast(answer as unsigned)) as average'
            )->value('average'),
        );
    }
}
