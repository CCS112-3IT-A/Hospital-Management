<?php

namespace App\Http\Controllers;
use App\Models\Medicalrecord;

use App\Models\User;
use App\Models\Patient;
use Illuminate\Http\Request;
use Carbon\Carbon;

class MedicalRecordController extends Controller
{
    public function getRecord()
{
    return Medicalrecord::all();
}


function addRecord(Request $req){

    $record = new Medicalrecord;
    $record->patient_id = $req->input('patient_id');
    $record->doctor_id = $req->input('doctor_id');
    $record->visit_date = Carbon::parse($req->input('visit_date'))->format('Y-m-d');
    $record->diagnosis = $req->input('diagnosis');
    $record->treatment = $req->input('treatment');
    $record->notes = $req->input('notes');

    $record->save();
    return response()->json($record);
}

function updateRecord(Request $req, $id){

    $record = Medicalrecord::find($id);

    if (!$record) {
        return response()->json(['error' => 'Record not found'], 404);
    } else {

    
            $record->patient_id = $req->input('patient_id');
            $record->doctor_id = $req->input('doctor_id');
            $record->visit_date = Carbon::parse($req->input('visit_date'))->format('Y-m-d');
            $record->diagnosis = $req->input('diagnosis');
            $record->treatment = $req->input('treatment');
            $record->notes = $req->input('notes');

            $record->save();
            return response()->json($record);
    }

}


function removeRecord($id){

    $record= Medicalrecord::find($id);


    if(!$id){

        response()->json(['error'=>'Record not found']);

    }else{

        $record->delete();

    }



}


public function GetMedicalRecord(Request $request)
{
    try {
        // Get the email of the authenticated user
        $authUserEmail = $request->user()->email;

        // Fetch patient ID for the authenticated user's email
        $patientId = Patient::where('email', $authUserEmail)->value('id');

        if (!$patientId) {
            return response()->json(['matching_medical_records' => []]);
        }

        // Fetch matching records from tblMedicalRecord with patient and doctor names
        $matchingRecords = MedicalRecord::where('patient_id', $patientId)
            ->with(['patient' => function ($query) {
                $query->select('id', 'first_name', 'last_name');
            }])
            ->with(['doctor' => function ($query) {
                $query->select('id', 'first_name', 'last_name');
            }])
            ->get([
                'id as record_id',
                'patient_id',
                'doctor_id',
                'visit_date',
                'diagnosis',
                'treatment',
                'notes',
            ]);

        return response()->json(['matching_medical_records' => $matchingRecords]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch medical records. ' . $e->getMessage()], 500);
    }
}


}
