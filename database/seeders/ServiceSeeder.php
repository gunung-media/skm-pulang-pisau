<?php

namespace Database\Seeders;

use App\Enums\ServiceEnum;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (ServiceEnum::cases() as $case) {
            Service::create([
                'title' => $case->value,
                'icon' => $case->icon(),
                'fill' => $case->fill(),
            ]);
        }
    }
}
