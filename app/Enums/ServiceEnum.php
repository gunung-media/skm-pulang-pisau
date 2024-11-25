<?php

namespace App\Enums;

enum ServiceEnum: string
{
    case CPNS_PPPK_POLICY = 'Kebijakan CPNS & PPPK';
    case FORMATION_PROCUREMENT = 'Pengadaan Formasi';
    case FUNCTIONAL_POSITION_DETERMINATION = 'Penetapan Jabatan Fungsional';
    case FUNCTIONAL_ALLOWANCE_DETERMINATION = 'Penetapan Tunjangan Jabatan Fungsional';
    case FINANCIAL_RIGHTS_DETERMINATION = 'Penetapan Hak Keuangan';
    case JOB_CLASS_DETERMINATION = 'Penetapan Kelas Jabatan';
    case DATA_AND_INFORMATION_SERVICES = 'Layanan Data dan Informasi';

    public function icon(): string
    {
        return match ($this) {
            self::CPNS_PPPK_POLICY => 'FileText',
            self::FORMATION_PROCUREMENT => 'Briefcase',
            self::FUNCTIONAL_POSITION_DETERMINATION => 'Award',
            self::FUNCTIONAL_ALLOWANCE_DETERMINATION => 'DollarSign',
            self::FINANCIAL_RIGHTS_DETERMINATION => 'CreditCard',
            self::JOB_CLASS_DETERMINATION => 'Layers',
            self::DATA_AND_INFORMATION_SERVICES => 'Database',
        };
    }

    public function fill(): string
    {
        return match ($this) {
            self::CPNS_PPPK_POLICY => '#4CAF50',            // Green for policies
            self::FORMATION_PROCUREMENT => '#2196F3',      // Blue for procurement
            self::FUNCTIONAL_POSITION_DETERMINATION => '#FFC107', // Amber for positions
            self::FUNCTIONAL_ALLOWANCE_DETERMINATION => '#FF5722', // Orange for allowances
            self::FINANCIAL_RIGHTS_DETERMINATION => '#673AB7',     // Purple for financial rights
            self::JOB_CLASS_DETERMINATION => '#9C27B0',            // Violet for job classes
            self::DATA_AND_INFORMATION_SERVICES => '#607D8B',      // Grey-blue for data services
        };
    }
}
