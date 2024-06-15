import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function UpdateDoctor({ doctor, refetchDoctors }) {
  const [show, setShow] = useState(false);
  const [doctorData, setDoctorData] = useState({
    first_name: doctor.first_name,
    last_name: doctor.last_name,
    specialization: doctor.specialization,
    license_number: doctor.license_number,
    phone: doctor.phone,
    email: doctor.email,
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInputChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/updateDoctors/${doctor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      if (response.ok) {
        console.log('Doctor updated successfully');
        handleClose();
        refetchDoctors(); // Call the refetchDoctors function to refresh the data
      } else {
        console.error('Failed to update doctor');
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update Doctor
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={doctorData.first_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={doctorData.last_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formSpecialization">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={doctorData.specialization}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formLicenseNumber">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                name="license_number"
                value={doctorData.license_number}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={doctorData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={doctorData.email}
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

export default UpdateDoctor;
