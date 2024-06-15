<?php

namespace App\Http\Controllers;
use App\Models\Appointment;
use App\Models\User; // Assuming tbluser model is User
use App\Models\Patient; // Assuming tblpatient model is Patient
use App\Models\Doctor; // Assuming tblpatient model is Patient
use Illuminate\Http\Request;
use Carbon\Carbon;
class AppointmentController extends Controller
{


    public function compareEmailsAndPatientIds()
    {
        try {
            // Fetch all emails from tbluser
            $userEmails = User::pluck('email')->toArray();
    
            // Fetch all emails from tblpatient
            $patientEmails = Patient::pluck('email')->toArray();
    
            // Find common emails
            $commonEmails = array_intersect($userEmails, $patientEmails);
    
            if (empty($commonEmails)) {
                return response()->json(['matching_medical_records' => []]);
            }
    
            // Fetch patient IDs for the common emails
            $patientIds = Patient::whereIn('email', $commonEmails)->pluck('id')->toArray();
    
            if (empty($patientIds)) {
                return response()->json(['matching_medical_records' => []]);
            }
    
            // Fetch matching records from tblMedicalRecord (assuming Appointment model is used for medical records)
            $matchingRecords = Appointment::whereIn('patient_id', $patientIds)
                ->get([
                    'id as appointment_id',
                    'patient_id',
                    'doctor_id',
                    'appointment_date',
                    'status',
                    'reason',
                ]);
    
            return response()->json(['matching_medical_records' => $matchingRecords]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to compare emails and patient IDs. ' . $e->getMessage()], 500);
        }
    }
    

    public function getAppointment()
{
    return Appointment::all();
}



    public function addAppointment(Request $req){
       
       
        // Create a new appointment
        $appointment = new Appointment;
        $appointment->patient_id = $req->input('patient_id');
        $appointment->doctor_id = $req->input('doctor_id');
        $appointment->appointment_date = Carbon::parse($req->input('appointment_date'))->format('Y-m-d');
        $appointment->status = $req->input('status');
        $appointment->reason = $req->input('reason');
    
        // Save the appointment
        $appointment->save();
    
        // Return the appointment
        return $appointment;
    }



    function updateAppointment(Request $req, $id){

        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json(['error' => 'Appointment not found'], 404);
        } else {

           
            $appointment->appointment_date = Carbon::parse($req->input('appointment_date'))->format('Y-m-d');
            $appointment->status = $req->input('status');
        

            $appointment->save();
            return response()->json($appointment);

        }

    }


    function removeAppointment($id){

        $appointment= Appointment::find($id);


        if(!$id){

            response()->json(['error'=>'Appointment not found']);

        }else{

            $appointment->delete();

        }



    }



    public function compareEmailsAndDoctorIds()
    {
        try {
            // Fetch all emails from tbluser
            $userEmails = User::pluck('email')->toArray();
    
            // Fetch all emails from tblpatient
            $patientEmails = Doctor::pluck('email')->toArray();
    
            // Find common emails
            $commonEmails = array_intersect($userEmails, $patientEmails);
    
            if (empty($commonEmails)) {
                return response()->json(['matching_medical_records' => []]);
            }
    
            // Fetch patient IDs for the common emails
            $patientIds = Doctor::whereIn('email', $commonEmails)->pluck('id')->toArray();
    
            if (empty($patientIds)) {
                return response()->json(['matching_medical_records' => []]);
            }
    
            // Fetch matching records from tblMedicalRecord (assuming Appointment model is used for medical records)
            $matchingRecords = Appointment::whereIn('patient_id', $patientIds)
                ->get([
                    'id as appointment_id',
                    'patient_id',
                    
                    'appointment_date',
                    'status',
                    'reason',
                ]);
    
            return response()->json(['matching_medical_records' => $matchingRecords]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to compare emails and patient IDs. ' . $e->getMessage()], 500);
        }
    }
    

    
}
