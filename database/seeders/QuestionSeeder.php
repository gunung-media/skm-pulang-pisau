<?php

namespace Database\Seeders;

use App\Repositories\QuestionRepository;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function __construct(
        public QuestionRepository $questionRepository,
    ) {}

    public function run(): void
    {
        foreach ($this->getQuestions() as $question) {
            $this->questionRepository->create([...$question, 'question_type_id' => $question['position']]);
        }
    }

    private function getQuestions(): array
    {
        return [
            [
                'question' => 'Bagaimana pendapat Saudara tentang kesesuaian persyaratan pelayanan dengan jenis pelayanannya?',
                'position' => 1,
                'custom_answers' => json_encode(['Tidak sesuai', 'Kurang sesuai',  'Sesuai', 'Sangat sesuai']),
            ],
            [
                'question' => 'Bagaimana pemahaman Saudara tentang kemudahan prosedur pelayanan di unit ini?',
                'position' => 2,
                'custom_answers' => json_encode(['Tidak mudah', 'Kurang mudah',   'Mudah', 'Sangat mudah']),
            ],
            [
                'question' => 'Bagaimana pendapat Saudara tentang kecepatan waktu dalam memberikan pelayanan?',
                'position' => 3,
                'custom_answers' => json_encode(['Tidak cepat', 'Kurang cepat',   'Cepat', 'Sangat cepat']),
            ],
            [
                'question' => 'Bagaimana pendapat Saudara tentang kewajaran biaya/tarif dalam pelayanan',
                'position' => 4,
                'custom_answers' => json_encode(['Sangat mahal', 'Cukup mahal',   'Murah', 'Gratis']),
            ],
            [
                'question' => 'Bagaimana pendapat Saudara tentang kesesuaian produk pelayanan antara yang tercantum dalam standar pelayanan dengan hasil yang diberikan.',
                'position' => 5,
                'custom_answers' => json_encode(['Tidak sesuai', 'Kurang sesuai',  'Sesuai', 'Sangat sesuai']),
            ],
            [
                'question' => 'Bagaimana pendapat Saudara tentang kompetensi/ kemampuan petugas dalam pelayanan.',
                'position' => 6,
                'custom_answers' => json_encode(['Tidak kompeten', 'Kurang kompeten',  'Kompeten', 'Sangat kompeten']),
            ],
            [
                'question' => 'Bagaimana pendapat Saudara tentang perilaku petugas dalam pelayanan terkait kesopanan dan keramahan',
                'position' => 7,
                'custom_answers' => json_encode(['Tidak sopan dan ramah', 'Kurang sopan dan ramah',  'Sopan dan ramah', 'Sangat sopan dan ramah']),
            ],
            [
                'question' => 'Bagaimana pendapat Saudara tentang kualitas sarana dan prasarana',
                'position' => 8,
                'custom_answers' => json_encode(['Buruk', 'Cukup',  'Baik', 'Sangat Baik']),
            ],
            [
                'question' => 'Bagaimana pendapat Saudara tentang penanganan pengaduan pengguna layanan',
                'position' => 9,
                'custom_answers' => json_encode(['Tidak ada', 'Ada tetapi tidak berfungsi',  'Berfungsi kurang maksimal', 'Dikelola dengan baik']),
            ]
        ];
    }
}
