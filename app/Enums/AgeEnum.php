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

    public function fill(): string
    {
        return match ($this) {
            self::PEMUDA => '#4CAF50',    // Green for youth
            self::DEWASA => '#2196F3',    // Blue for adult
            self::TUA => '#FF9800',       // Orange for middle-aged
            self::LANSIA => '#9C27B0',    // Purple for elderly
        };
    }
}
