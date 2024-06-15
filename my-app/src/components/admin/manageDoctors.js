import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import AddDoctor from '../Functions/Doctors/addDoctors';
import UpdateDoctor from '../Functions/Doctors/updateDoctors';
import RemoveDoctor from '../Functions/Doctors/removeDoctors';

function ManageDoctors() {

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
      fetchDoctors();
    }, []);
  
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/list/');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
  
    const refetchDoctors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/list/');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error refetching doctors:', error);
      }
    };

    const handleDoctorRemovalSuccess = () => {
        console.log('Doctor removed successfully');
        // Additional logic here, such as refreshing the list of doctors
        fetchDoctors(); // Example: refetching doctors after removal
      };
      
  
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <AddDoctor refetchDoctors={refetchDoctors} />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Specialization</th>
              <th>License Number</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.first_name}</td>
                <td>{doctor.last_name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.license_number}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.email}</td>
                <td>
                  <UpdateDoctor doctor={doctor} refetchDoctors={refetchDoctors} />
                  <RemoveDoctor doctorId={doctor.id} onRemoveSuccess={handleDoctorRemovalSuccess} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  
}

export default ManageDoctors;
