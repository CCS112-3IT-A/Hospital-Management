// ChangeRole.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function ChangeRole({ userId, refetchUsers }) {
  const [show, setShow] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: selectedRole }),
      });

      if (response.ok) {
        console.log('Role updated successfully');
        handleClose();
        refetchUsers(); // Call the refetchUsers function to refresh the data
      } else {
        console.error('Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Change Role
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRole">
              <Form.Label>Select Role</Form.Label>
              <Form.Control as="select" value={selectedRole} onChange={handleRoleChange}>
                <option value="">Select a role</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
                <option value="receptionist">Receptionist</option>
              </Form.Control>
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

export default ChangeRole;