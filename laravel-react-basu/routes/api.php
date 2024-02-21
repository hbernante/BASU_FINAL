<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/location', 'LocationController@getLocation');


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::apiResource('reservation',ReservationController::class);
    Route::post('/location', [LocationController::class, 'updateLocation']);
    Route::get('/location', [LocationController::class, 'getLocation']);
});

Route::post('/signup', [AuthController::class,'signup']);
Route::post('/login', [AuthController::class,'login']);


