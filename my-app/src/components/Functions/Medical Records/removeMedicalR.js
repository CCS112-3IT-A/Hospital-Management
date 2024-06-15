import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function RemoveRecord({ recordId, onRemoveSuccess }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleRemove = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/removeRecord/${recordId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Record removed successfully');
        handleClose(); // Close the modal after successful removal
        onRemoveSuccess(); // Notify the parent component about the successful removal
      } else {
        console.error('Failed to remove record');
      }
    } catch (error) {
      console.error('Error removing record:', error);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Remove
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this record?</p>
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

export default RemoveRecord;
