<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Service extends Model
{
    protected $fillable = [
        'title',
        'icon',
        'fill',
    ];
}
