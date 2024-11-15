<?php

namespace App\Enums;

enum JobEnum: string
{
    case ASN = 'ASN';
    case TNI = 'TNI';
    case POLRI = 'Polri';
    case SWASTA = 'Swasta';
    case WIRAUSAHA = 'Wirausaha';
    case MAHASISWA = 'Mahasiswa/i';
    case MASYARAKAT = 'Masyarakat';

    public function icon(): string
    {
        return match ($this) {
            self::ASN => 'UserCheck',      // ASN icon
            self::TNI => 'Shield',          // TNI icon
            self::POLRI => 'ShieldAlert',  // POLRI icon
            self::SWASTA => 'Briefcase',    // SWASTA icon
            self::WIRAUSAHA => 'Store', // WIRAUSAHA icon
            self::MAHASISWA => 'GraduationCap', // MAHASISWA icon
            self::MASYARAKAT => 'Users',    // MASYARAKAT icon
        };
    }
}
