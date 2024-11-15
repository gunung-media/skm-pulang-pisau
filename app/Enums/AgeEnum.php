<?php

namespace App\Enums;

enum AgeEnum: string
{
    case PEMUDA = '< 25 Tahun';
    case DEWASA = '25 - 39 Tahun';
    case TUA = '40 - 55 Tahun';
    case LANSIA = '> 55 Tahun';

    public function icon(): string
    {
        return match ($this) {
            self::PEMUDA => 'UserPlus',
            self::DEWASA => 'User',
            self::TUA => 'Briefcase',
            self::LANSIA => 'UserCheck',
        };
    }
}
