<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'book_id' => 'required|exists:books,id',
            'order_id' => 'required|exists:orders,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ];
    }

    public function messages()
    {
        return [
            'book_id.required' => 'Book ID is required',
            'book_id.exists' => 'Selected book does not exist',
            'order_id.required' => 'Order ID is required',
            'order_id.exists' => 'Order does not exist',
            'quantity.required' => 'Quantity is required',
            'quantity.min' => 'Quantity must be at least 1',
            'price.required' => 'Price is required',
            'price.min' => 'Price must be at least 0',
        ];
    }
}
