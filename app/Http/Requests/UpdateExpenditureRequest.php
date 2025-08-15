<?php

namespace App\Http\Requests;

use App\Models\Expenditure;
use Illuminate\Foundation\Http\FormRequest;

class UpdateExpenditureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $categories = implode(',', Expenditure::getCategories());
        
        return [
            'amount' => 'required|numeric|min:0',
            'expenditure_date' => 'required|date',
            'category' => 'required|in:' . $categories,
            'description' => 'required|string|max:1000',
            'proof_file' => 'nullable|string|max:255',
            'status' => 'required|in:approved,pending,rejected',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'amount.required' => 'Expenditure amount is required.',
            'amount.numeric' => 'Expenditure amount must be a valid number.',
            'amount.min' => 'Expenditure amount must be greater than or equal to 0.',
            'expenditure_date.required' => 'Expenditure date is required.',
            'expenditure_date.date' => 'Expenditure date must be a valid date.',
            'category.required' => 'Category is required.',
            'category.in' => 'Please select a valid category.',
            'description.required' => 'Description is required.',
            'description.max' => 'Description cannot exceed 1000 characters.',
        ];
    }
}