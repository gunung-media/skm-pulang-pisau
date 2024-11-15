<?php

namespace App\Http\Controllers;

use App\Enums\AgeEnum;
use App\Enums\EducationEnum;
use App\Enums\JobEnum;
use App\Enums\ServiceEnum;
use Illuminate\Http\JsonResponse;

class ApiController extends Controller
{
    private function getEnumValuesAsString(string $enumClass): array
    {
        if (!enum_exists($enumClass)) {
            return [];
        }

        return collect($enumClass::cases())->map(fn($case) => [$case->value => $case->icon()])
            ->mapWithKeys(fn($item) => $item)
            ->toArray();
    }

    public function getStaticData(): JsonResponse
    {
        return response()->json([
            'jobs' => $this->getEnumValuesAsString(JobEnum::class),
            'educations' => $this->getEnumValuesAsString(EducationEnum::class),
            'ages' => $this->getEnumValuesAsString(AgeEnum::class),
            'services' => $this->getEnumValuesAsString(ServiceEnum::class),
        ]);
    }
}
