<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\AppointmentController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function(Request $request){
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('bookAppointment',[AppointmentController::class, 'bookAppointment']);
Route::get('viewAppointments',[AppointmentController::class, 'viewAppointments']);
Route::delete('cancelAppointment',[AppointmentController::class, 'cancelAppointment']);

Route::post('addDoctors',[DoctorController::class,'addDoctors']);
Route::get('list',[DoctorController::class,'list']);
Route::put('/updateDoctors/{id}', [DoctorController::class, 'updateDoctors']);
