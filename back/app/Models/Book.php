<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'price', 'auteur', 'category_id', 'stock',
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
