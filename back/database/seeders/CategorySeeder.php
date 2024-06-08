<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Books',
            'Electronics',
            'Clothing',
            'Home & Kitchen',
            'Sports',
            'Toys & Games',
            'Health & Personal Care',
            'Automotive',
            'Garden & Outdoor',
            'Office Supplies'
        ];

        foreach ($categories as $category) {
            DB::table('category')->insert([
                'name' => $category,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
