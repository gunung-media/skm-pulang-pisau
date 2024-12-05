<?php

namespace App\Http\Controllers;

use App\Enums\AgeEnum;
use App\Enums\EducationEnum;
use App\Enums\JobEnum;
use App\Repositories\ServiceRepository;
use Illuminate\Http\JsonResponse;

class ApiController extends Controller
{
    public function __construct(
        protected ServiceRepository $serviceRepository,
    ) {}

    private function getEnumValuesAsString(string $enumClass): array
    {
        if (!enum_exists($enumClass)) {
            return [];
        }

        return collect($enumClass::cases())->map(fn($case) => ['title' => $case->value, 'icon' => $case->icon(), 'fill' => $case->fill()])
            ->toArray();
    }

    public function getStaticData(): JsonResponse
    {
        return response()->json([
            'jobs' => $this->getEnumValuesAsString(JobEnum::class),
            'educations' => $this->getEnumValuesAsString(EducationEnum::class),
            'ages' => $this->getEnumValuesAsString(AgeEnum::class),
            'services' => $this->serviceRepository->getAll(),
        ]);
    }
}
