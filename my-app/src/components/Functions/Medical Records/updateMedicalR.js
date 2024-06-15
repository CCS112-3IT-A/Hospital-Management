import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function UpdateMedicalRec({ show, onClose, record, refetchRecords }) {
  const [recordData, setRecordData] = useState({
    patient_id: record.patient_id,
    doctor_id: record.doctor_id,
    visit_date: record.visit_date,
    diagnosis: record.diagnosis,
    treatment: record.treatment,
    notes: record.notes,
  });

  const handleInputChange = (e) => {
    setRecordData({ ...recordData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/updateRecord/${record.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordData),
      });

      if (response.ok) {
        console.log('Record updated successfully');
        onClose();
        refetchRecords(); // Refresh data
      } else {
        console.error('Failed to update record');
      }
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Medical Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPatientId">
            <Form.Label>Patient ID</Form.Label>
            <Form.Control
              type="text"
              name="patient_id"
              value={recordData.patient_id}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDoctorId">
            <Form.Label>Doctor ID</Form.Label>
            <Form.Control
              type="text"
              name="doctor_id"
              value={recordData.doctor_id}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formVisitDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="visit_date"
              value={recordData.visit_date}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDiagnosis">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              type="text"
              name="diagnosis"
              value={recordData.diagnosis}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTreatment">
            <Form.Label>Treatment</Form.Label>
            <Form.Control
              type="text"
              name="treatment"
              value={recordData.treatment}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={recordData.notes}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateMedicalRec;
