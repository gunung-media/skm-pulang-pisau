<?php

namespace App\Exports;

use App\Models\Question;
use App\Models\Respondent;
use App\Models\Response;
use App\Models\Service;
use App\Repositories\RespondentRepository;
use App\Repositories\ResponseRepository;
use App\Repositories\QuestionRepository;
use App\Repositories\ServiceRepository;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ReportExport implements FromArray, WithHeadings, WithStyles, WithEvents
{
    private int $totalQuestion = 9;
    private int $totalResponden = 0;
    private array $COLUMN_ARRAY =
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    private $maxCol;
    private $maxRow;

    protected ResponseRepository $responseRepository;

    public function __construct(
        protected ServiceRepository $serviceRepository = new ServiceRepository(new Service()),
        protected QuestionRepository $questionRepository = new QuestionRepository(new Question()),
        protected RespondentRepository $respondentRepository = new RespondentRepository(new Respondent()),

    ) {
        $this->responseRepository = new ResponseRepository(new Response(), $this->respondentRepository, $this->questionRepository);
        $this->totalQuestion = $this->questionRepository->count();
        $this->totalResponden = $this->respondentRepository->count();
        $this->maxCol = $this->COLUMN_ARRAY[$this->totalQuestion];
        $this->maxRow = $this->totalResponden + 9;
    }

    public function headings(): array
    {
        return [
            ['PENGOLAHAN INDEKS KEPUASAN PER RESPONDEN DAN UNSUR PELAYANAN'],
            ['Jumlah Responden', $this->totalResponden, ...array_fill(0, $this->totalQuestion, '')],
            ['No Urut Responden'],
            ['', ...collect(range(1, $this->totalQuestion))->map(fn($item) => "P$item")->toArray()],
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => [
                'font' => ['bold' => true, 'size' => 14],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                    'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                ],
            ],
            2 => [
                'font' => ['bold' => true],
            ],
            3 => [
                'font' => ['bold' => true],
            ],
            4 => [
                'font' => ['bold' => true],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
            ],
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {

                $sheet = $event->sheet;

                $sheet->mergeCells('A1:J1');
                $sheet->mergeCells('A3:A4');
                $sheet->mergeCells("C2:{$this->maxCol}2");
                $sheet->mergeCells("B3:{$this->maxCol}3");

                $sheet->mergeCells("B" . ($this->maxRow - 1) . ":" . $this->maxCol . ($this->maxRow - 1));
                $sheet->mergeCells("B" . ($this->maxRow) . ":" . $this->maxCol . ($this->maxRow));

                $sheet->getDelegate()->getStyle("A2:{$this->maxCol}{$this->maxRow}")->getBorders()->getAllBorders()->setBorderStyle(
                    \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN
                );

                $sheet->getDelegate()->getStyle("A1:{$this->maxCol}{$this->maxRow}")->getAlignment()
                    ->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER)
                    ->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);

                $sheet->getDelegate()->getColumnDimension('A')->setAutoSize(true);
            },
        ];
    }

    public function array(): array
    {
        $report = $this->responseRepository->report();
        $footer = [
            ['Jumlah Nilai per Parameter (JP)', ...collect($report['counting'])->map(fn($item) => $item['sum'])->toArray()],
            ['Nilai Rata-rata (NRR) per Parameter', ...collect($report['counting'])->map(fn($item) => $item['average'])->toArray()],
            ['Nilai Indeks per Parameter', ...collect($report['counting'])->map(fn($item) => $item['average'])->toArray()],
            ['Indeks Kepuasan Masyarakat (IKM)', number_format($report['sumIndex'] * 25, 2)],
            ['Kategori Penilaian Kepuasan Pelayanan', $report['performance']],
        ];

        $data = $this->respondentRepository->simpleData();

        return array_merge($data, $footer);
    }
}
