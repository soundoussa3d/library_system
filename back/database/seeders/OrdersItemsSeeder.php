<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrdersItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = DB::table('orders')->pluck('id')->toArray();
        $books = DB::table('books')->pluck('id')->toArray();

        for ($i = 1; $i <= 20; $i++) {
            $orderId = $orders[array_rand($orders)];
            $bookId = $books[array_rand($books)];

            DB::table('orders_items')->insert([
                'book_id' => $bookId,
                'order_id' => $orderId,
                'quantity' => rand(1, 5),
                'price' => rand(1000, 10000) / 100,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
