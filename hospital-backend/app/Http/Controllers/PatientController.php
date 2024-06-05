<?php

namespace App\Http\Controllers;
use app\Models\Appointment;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    function bookAppointment(Request $req){
        $appointment = new Appointment;
        $appointment->patient_id=$req->input('patient_id');
        $appointment->doctor_id=$req->input('doctor_id');
        $appointment->appointment_date=$req->input('appointment_date');
        $appointment->status=$req->input('status');
        $appointment->reason=$req->input('reason');
        $appointment->created_at=$req->input('created_at');
        $appointment->updated_at=$req->input('updated_at');
    }

    function viewAppointments(){
        return Appointment::all();
    }

    function cancelAppointment($id){
        $appointment = Appointment::find($id);
        if(!$appointment){
            return response()->json(['error' => 'Appointment not found'], 404);
        }
        $appointment->delete();

        return response()->json(null, 204);
    }
}
