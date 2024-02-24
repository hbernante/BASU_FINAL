<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\Registration;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegistrationRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // User registration
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => 'admin', // Set the role to admin
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    // User login
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The provided credentials are not correct'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    // User logout
    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    // Get authenticated user details
    public function me(Request $request)
    {
        return $request->user();
    }

    // Registration process for entities other than User
    public function register(RegistrationRequest $request)
    {
        $validated = $request->validated();

        $registration = Registration::create([
            'first_name' => $validated['firstName'],
            'last_name' => $validated['lastName'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role']
        ]);

        return response()->json(['message' => 'Registration successful'], 201);
    }

    // Get list of accounts (Users)
    public function getAccounts(Request $request)
    {
        try {
            // Fetch accounts from the registration table
            $accounts = Registration::all();

            // Return JSON response with accounts
            return response()->json($accounts);
        } catch (\Exception $e) {
            // Handle exceptions and return error response
            return response()->json(['error' => 'Failed to fetch accounts'], 500);
        }
    }

    public function deleteAccount($id)
    {
        $account = Registration::find($id);

        if (!$account) {
            return response()->json(['message' => 'Account not found'], 404);
        }

        $account->delete();

        return response()->json(['message' => 'Account deleted successfully'], 200);
    }

    public function updateAccount(Request $request, $id)
    {
        $account = Registration::find($id);

        if (!$account) {
            return response()->json(['error' => 'Account not found for ID ' . $id], 404);
        }

        // Validate input data
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:registration,email,' . $id,
            'role' => 'required|string|in:student,driver',
            'phone_number' => $request->input('role') == 'driver' ? 'required|string|max:20' : '',
            'password' => 'sometimes|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        // Update account details
        $account->fill($request->all()); // Fill the model with request data
        $account->save();

        return response()->json(['message' => 'Account details updated successfully', 'account' => $account]);
    }

}
