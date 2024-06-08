<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PatientController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MedicalRecordController;


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

//APPOINTMENT
Route::post('bookAppointment',[AppointmentController::class, 'bookAppointment']);
Route::get('viewAppointments',[AppointmentController::class, 'viewAppointments']);
Route::delete('cancelAppointment',[AppointmentController::class, 'cancelAppointment']);

//PATIENT

Route::post('addPatient',[PatientController::class,'addPatient']);
Route::get('ViewPatient',[PatientController::class,'ViewPatient']);
Route::put('/updatePatient/{id}',[PatientController::class,'updatePatient']);
Route::delete('/removePatient/{id}',[PatientController::class,'removePatient']);

// USER
Route::post('addUser',[UserController::class,'addUser']);
Route::get('viewUser',[UserController::class,'viewUser']);
Route::put('/updateUser/{id}',[UserController::class,'updateUser']);
Route::delete('/removeUser/{id}',[UserController::class,'removeUser']);

// MEDICAL RECORD
Route::get('medical_records', [MedicalRecordController::class, 'getAllMedicalRecords']);
Route::post('medical_records', [MedicalRecordController::class, 'storeMedicalRecord']);
Route::get('medical_records/{id}', [MedicalRecordController::class, 'getMedicalRecordById']);
Route::put('medical_records/{id}', [MedicalRecordController::class, 'updateMedicalRecord']);
Route::delete('medical_records/{id}', [MedicalRecordController::class, 'deleteMedicalRecord']);

