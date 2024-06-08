<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'cellphone' => 'required|string|max:15',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required',
            'address.required' => 'Address is required',
            'cellphone.required' => 'Cellphone is required',
        ];
    }
}
