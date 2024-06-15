import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function RemoveDoctor({ doctorId, onRemoveSuccess }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleRemove = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/removeDoctors/${doctorId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Doctor removed successfully');
        handleClose(); // Close the modal after successful removal
        onRemoveSuccess(); // Notify the parent component about the successful removal
      } else {
        console.error('Failed to remove doctor');
      }
    } catch (error) {
      console.error('Error removing doctor:', error);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Remove
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this doctor?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RemoveDoctor;
