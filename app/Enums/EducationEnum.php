<?php

namespace App\Enums;

enum EducationEnum: string
{
    case TIDAK_SEKOLAH = 'Tidak Sekolah';
    case SMA = 'SMA/SMK';
    case DIPLOMA = 'Diploma';
    case S1 = 'S1';
    case S2 = 'S2';
    case S3 = 'S3';
    case LAINNYA = 'Lainnya';

    public function icon(): string
    {
        return match ($this) {
            self::TIDAK_SEKOLAH => 'CircleX',
            self::SMA => 'BookOpen',
            self::DIPLOMA => 'ClipboardList',
            self::S1 => 'Award',
            self::S2 => 'GraduationCap',
            self::S3 => 'School',
            self::LAINNYA => 'Info',
        };
    }

    public function fill(): string
    {
        return match ($this) {
            self::TIDAK_SEKOLAH => '#E53935',      // Red for no schooling
            self::SMA => '#FB8C00',               // Orange for high school
            self::DIPLOMA => '#FDD835',           // Yellow for diploma
            self::S1 => '#4CAF50',                // Green for undergraduate
            self::S2 => '#2196F3',                // Blue for master's degree
            self::S3 => '#9C27B0',                // Purple for doctorate
            self::LAINNYA => '#757575',           // Grey for others
        };
    }
}
