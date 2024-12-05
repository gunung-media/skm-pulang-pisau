<?php

namespace Database\Seeders;

use App\Models\QuestionType;
use Illuminate\Database\Seeder;

class QuestionTypeSeeder extends Seeder
{
    static $defaultQuestionTypes = [
        'Persyaratan',
        'Sistem, Mekanisme, dan Prosedur',
        'Waktu Penyelesaian',
        'Biaya/Tarif',
        'Produk Spesifikasi Jenis Pelayanan',
        'Kompetensi Pelaksana',
        'Perilaku Pelaksana',
        'Sarana dan Prasarana',
        'Penanganan Pengaduan, Saran dan Masukan',
    ];
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (self::$defaultQuestionTypes as $questionType) {
            QuestionType::create([
                'name' => $questionType,
            ]);
        }
    }
}
