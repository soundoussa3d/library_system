<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            DB::table('orders')->insert([
                'name' => 'Customer ' . $i,
                'address' => 'Address ' . $i,
                'cellphone' => '123-456-789' . $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
