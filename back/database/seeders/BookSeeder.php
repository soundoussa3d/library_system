<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = DB::table('category')->pluck('id');

        for ($i = 1; $i <= 10; $i++) {
            DB::table('books')->insert([
                'title' => 'Book ' . $i,
                'price' => mt_rand(1000, 10000) / 100,
                'auteur' => 'Author ' . $i,
                'category_id' => $categories->random(),
                'stock' => mt_rand(1, 100),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
