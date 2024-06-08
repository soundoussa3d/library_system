<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
class BookController extends Controller
{
    //show all books
    public function index()
    {
        $books = Book::all();
        return $books;
    }
}
