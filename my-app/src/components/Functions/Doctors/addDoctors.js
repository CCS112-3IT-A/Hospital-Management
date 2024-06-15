import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

const AddDoctor = ({ refetchDoctors }) => {
  const [show, setShow] = useState(false);
  const [doctorData, setDoctorData] = useState({
    first_name: '',
    last_name: '',
    specialization: '',
    license_number: '',
    phone: '',
    email: '',
  });

  const [error, setError] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setError('');
    // Reset form data when modal is closed
    setDoctorData({
      first_name: '',
      last_name: '',
      specialization: '',
      license_number: '',
      phone: '',
      email: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/addDoctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Doctor added successfully:', responseData);
        handleClose(); // Close modal upon successful addition
        refetchDoctors(); // Refresh the doctor list after adding a new doctor
      } else {
        console.error('Failed to add doctor:', responseData.error);
        setError(`Failed to add doctor: ${responseData.message || 'An error occurred'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while adding the doctor');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Doctor
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={doctorData.first_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={doctorData.last_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formSpecialization">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={doctorData.specialization}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLicenseNumber">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                name="license_number"
                value={doctorData.license_number}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={doctorData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={doctorData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Doctor
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddDoctor;
