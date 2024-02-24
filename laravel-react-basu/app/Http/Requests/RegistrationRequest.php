<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegistrationRequest extends FormRequest
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

        $id = $this->route('id');

        return [
            'firstName' => 'required',
            'lastName' => 'required',
            'email' => 'required|email|unique:registration,email,' . $id,
            'password' => 'required|min:6',
            'role' => 'required|in:student,driver'
        ];
    }
}
