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
}
