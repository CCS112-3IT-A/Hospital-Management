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
        $doctor->save();
        return $doctor;
    }

    function list()
    {
        return Doctor::all();
    }

    
    function updateDoctors(Request $req, $id) {
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
            
            $doctor->save();
    
            return response()->json($doctor);
        }
    }



    function removeDoctors($id){

        $doctor= Doctor::find($id);


        if(!$id){

            response()->json(['error'=>'Doctor not found']);

        }else{

            $doctor->delete();

        }



    }

}
