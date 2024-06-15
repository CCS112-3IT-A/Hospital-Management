import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function AccountRemove({ userId }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleRemove = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/removeUser/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('User removed successfully');
        // You can perform additional actions here, such as refreshing the user list
      } else {
        console.error('Failed to remove user');
      }
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  const confirmRemove = () => {
    const confirmed = window.confirm('Are you sure you want to remove this user?');
    if (confirmed) {
      handleRemove();
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Remove
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this user?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AccountRemove;