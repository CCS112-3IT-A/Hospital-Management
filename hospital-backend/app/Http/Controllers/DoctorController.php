<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    function addDoctors(Request $req)
    {
        $doctor = new Doctor;
        $doctor->first_name=$req->input('first_name');
        $doctor->last_name=$req->input('last_name');
        $doctor->specialization=$req->input('specialization');
        $doctor->license_number=$req->input('license_number');
        $doctor->phone=$req->input('phone');
        $doctor->email=$req->input('email');
        $doctor->created_at=$req->input('created_at');
        $doctor->updated_at=$req->input('updated_at');
        $doctor->save();
        return $doctor;
    }

    function list()
    {
        return Doctor::all();
    }
    function updateDoctor(Request $req, $id) {
        $doctor = Doctor::find($id);

        if (!$doctor) {
            return response()->json(['error' => 'Doctor not found'], 404);
        } else {
            $doctor->first_name=$req->input('first_name');
            $doctor->last_name=$req->input('last_name');
            $doctor->specialization=$req->input('specialization');
            $doctor->license_number=$req->input('license_number');
            $doctor->phone=$req->input('phone');
            $doctor->email=$req->input('email');
            $doctor->created_at=$req->input('created_at');
            $doctor->updated_at=$req->input('updated_at');
            $doctor->save();
    
            return response()->json($doctor);
        }
    }
}