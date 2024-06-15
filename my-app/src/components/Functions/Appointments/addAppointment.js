import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

function AddAppointment({ refetchAppointments }) {
  const [show, setShow] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    patient_id: '',
    doctor_id: '',
    reason: '',
  });
  const [error, setError] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setError('');
    // Reset form data when modal is closed
    setAppointmentData({
      patient_id: '',
      doctor_id: '',
      reason: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/addAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Appointment added successfully:', responseData);
        handleClose(); // Close modal upon successful addition
        refetchAppointments(); // Refresh the appointments list after adding a new appointment
      } else {
        console.error('Failed to add appointment:', responseData.error);
        setError(`Failed to add appointment: ${responseData.message || 'An error occurred'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while adding the appointment');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Appointment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPatientId">
              <Form.Label>Patient ID</Form.Label>
              <Form.Control
                type="text"
                name="patient_id"
                value={appointmentData.patient_id}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDoctorId">
              <Form.Label>Doctor ID</Form.Label>
              <Form.Control
                type="text"
                name="doctor_id"
                value={appointmentData.doctor_id}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formReason">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                type="text"
                name="reason"
                value={appointmentData.reason}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Appointment
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddAppointment;
