<?php

namespace App\Http\Controllers;
use App\Models\Patient;
use Illuminate\Http\Request;
class PatientController extends Controller
{


    function AddPatient(Request $req){


        
        $patient = new Patient;
        $patient->id = $req->input('id');
        $patient->firstname = $req->input('first_name');
        $patient->lastname = $req->input('last_name');
        $patient->dateOfBirth = $req->input('date_of_birth');
        $patient->gender = $req->input('gender');
        $patient->address = $req->input('address');
        $patient->phone = $req->input('phone');
        $patient->email = $req->input('email');
        $patient->emergencyContact = $req->input('emergency_contact');
        $patient->medicalHistory = $req->input('medical_history');

        $patient->save();

        return $patient;

    }


    function ViewPatient(){
        return Patient::all();
    }


    function updatePatient(Request $req, $id){

        $patient= Patient::find($id);

        if(!$patient){
            

            response()->json(['error'=>'Patient not found']);

      
            
        }else{
            
            $patient->id = $req->input('id');
            $patient->firstname = $req->input('first_name');
            $patient->lastname = $req->input('last_name');
            $patient->dateOfBirth = $req->input('date_of_birth');
            $patient->gender = $req->input('gender');
            $patient->address = $req->input('address');
            $patient->phone = $req->input('phone');
            $patient->email = $req->input('email');
            $patient->emergencyContact = $req->input('emergency_contact');
            $patient->medicalHistory = $req->input('medical_history');
            
            $patient->save();
        }

    }



    function removePatient($id){

        $patient= Patient::find($id);


        if(!$id){

            response()->json(['error'=>'Patient not found']);

        }else{

            $patient->delete();

        }



    }


} 