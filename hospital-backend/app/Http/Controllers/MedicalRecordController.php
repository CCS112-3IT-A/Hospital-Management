<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MedicalRecord;
use Illuminate\Http\Request;

class MedicalRecordController extends Controller
{
    // Retrieve all medical records
    public function getAllMedicalRecords()
    {
        $records = MedicalRecord::with(['patient', 'doctor'])->get();
        return response()->json($records);
    }

    // Store a new medical record
    public function storeMedicalRecord(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'visit_date' => 'required|date',
            'diagnosis' => 'required|string',
            'treatment' => 'required|string',
            'notes' => 'nullable|string'
        ]);

        $record = MedicalRecord::create($request->all());
        return response()->json($record, 201);
    }

    // Retrieve a specific medical record by id
    public function getMedicalRecordById($id)
    {
        $record = MedicalRecord::with(['patient', 'doctor'])->findOrFail($id);
        return response()->json($record);
    }

    // Update an existing medical record
    public function updateMedicalRecord(Request $request, $id)
    {
        $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'visit_date' => 'required|date',
            'diagnosis' => 'required|string',
            'treatment' => 'required|string',
            'notes' => 'nullable|string'
        ]);

        $record = MedicalRecord::findOrFail($id);
        $record->update($request->all());
        return response()->json($record);
    }

    // Delete a medical record
    public function deleteMedicalRecord($id)
    {
        $record = MedicalRecord::findOrFail($id);
        $record->delete();
        return response()->json(null, 204);
    }
}