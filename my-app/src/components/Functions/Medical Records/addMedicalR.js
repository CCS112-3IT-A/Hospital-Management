import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function AddRecord({ show, onClose }) {
  const [patient_id, setPatientId] = useState('');
  const [doctor_id, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/addRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patient_id, doctor_id, date, diagnosis, treatment, notes }),
      });
      if (response.ok) {
        console.log('Record added successfully');
        // Reset form fields or perform any additional actions
        setPatientId('');
        setDoctorId('');
        setDate('');
        setDiagnosis('');
        setTreatment('');
        setNotes('');
        onClose(); // Close the modal after successful submission
      } else {
        console.error('Failed to add record');
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Patient ID</Form.Label>
            <Form.Control
              type="text"
              value={patient_id}
              onChange={(e) => setPatientId(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Doctor ID</Form.Label>
            <Form.Control
              type="text"
              value={doctor_id}
              onChange={(e) => setDoctorId(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Treatment</Form.Label>
            <Form.Control
              type="text"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Record
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddRecord;
