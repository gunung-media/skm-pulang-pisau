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

    public function fill(): string
    {
        return match ($this) {
            self::ASN => '#1F77B4',         // Blue for ASN
            self::TNI => '#2CA02C',         // Green for TNI
            self::POLRI => '#FF7F0E',       // Orange for POLRI
            self::SWASTA => '#9467BD',      // Purple for SWASTA
            self::WIRAUSAHA => '#E377C2',   // Pink for WIRAUSAHA
            self::MAHASISWA => '#8C564B',   // Brown for MAHASISWA
            self::MASYARAKAT => '#7F7F7F',  // Grey for MASYARAKAT
        };
    }
}
