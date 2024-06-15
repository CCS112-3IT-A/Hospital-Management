// ManageAccounts.js
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import ChangeRole from '../Functions/Accounts/ChangeRole';
import Remove from '../Functions/Accounts/AccountRemove';

function ManageAccounts() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/viewUser');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const refetchUsers = fetchUsers; // Create a reference to the fetchUsers function

  const removeUser = (userId) => {
    // Implement logic to remove the user with the given userId
    console.log(`Remove user with ID: ${userId}`);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <ChangeRole userId={user.id} refetchUsers={refetchUsers} />
                <Remove userId={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ManageAccounts;