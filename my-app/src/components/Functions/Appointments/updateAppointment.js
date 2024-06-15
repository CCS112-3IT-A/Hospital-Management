import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function UpdateAppointment({ appointment, refetchAppointments }) {
  const [show, setShow] = useState(false);
  const [appointmentData, setAppointmentData] = useState(appointment); // Initialize state with appointment prop

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInputChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/updateAppointment/${appointment.appointment_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        console.log('Appointment updated successfully');
        handleClose();
        refetchAppointments(); // Call the refetchAppointments function to refresh the data
      } else {
        console.error('Failed to update appointment');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update Appointment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAppointmentDate">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                type="date"
                name="appointment_date"
                value={appointmentData.appointment_date}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={appointmentData.status}
                onChange={handleInputChange}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formReason">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="reason"
                value={appointmentData.reason}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateAppointment;
