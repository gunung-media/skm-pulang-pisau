<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Question extends Model
{
    protected $fillable = [
        'question',
        'position',
        'is_active',
        'number_of_answers',
        'custom_answers'
    ];

    protected $casts = [
        'custom_answers' => 'array',
        'is_active' => 'boolean'
    ];

    public function responses(): HasMany
    {
        return $this->hasMany(Response::class);
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
