<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'admin@admin.com',
        ]);

        $this->call(QuestionTypeSeeder::class);
        $this->call(QuestionSeeder::class);
        $this->call(ServiceSeeder::class);
    }
}
