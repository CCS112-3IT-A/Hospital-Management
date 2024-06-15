import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
// import AddPatient from '../Functions/Patient/addPatient';
 import UpdatePatient from '../Functions/Patient/updatePatient';
// import RemovePatient from '../Functions/Patient/removePatient';

function ManagePatient() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/ViewPatient');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const refetchPatients = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/ViewPatient');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error refetching patients:', error);
    }
  };

  return (
    <>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Emergency Contact</th>
            <th>Medical History</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.first_name}</td>
              <td>{patient.last_name}</td>
              <td>{patient.date_of_birth}</td>
              <td>{patient.gender}</td>
              <td>{patient.address}</td>
              <td>{patient.phone}</td>
              <td>{patient.email}</td>
              <td>{patient.emergency_contact}</td>
              <td>{patient.medical_history}</td>
              
                <UpdatePatient patient={patient} refetchPatients={refetchPatients} />
               
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ManagePatient;
