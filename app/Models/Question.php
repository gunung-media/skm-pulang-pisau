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

    protected function casts()
    {
        return [
            'is_active' => 'boolean',
        ];
    }

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

    protected function customAnswers(): Attribute
    {
        return Attribute::make(
            get: fn($value) => is_null($value) ? json_encode(["Sangat Buruk", "Buruk", "Bagus", "Sangat Bagus"]) : $value,
            set: fn($value) =>  json_encode($value)
        );
    }
}
