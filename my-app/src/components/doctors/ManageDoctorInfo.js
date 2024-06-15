import React, { useState, useEffect } from 'react';

const ManageDoctorsTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    firstName: '',
    lastName: '',
    specialization: '',
    licenseNumber: '',
    phone: '',
    email: ''
  });

  // Function to fetch list of doctors
  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/list');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        console.error('Failed to fetch doctors');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to add a new doctor
  const addDoctor = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/addDoctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor),
      });

      if (response.ok) {
        // If doctor added successfully, fetch updated list of doctors
        fetchDoctors();
        // Clear the form
        setNewDoctor({
          firstName: '',
          lastName: '',
          specialization: '',
          licenseNumber: '',
          phone: '',
          email: ''
        });
      } else {
        console.error('Failed to add doctor');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch list of doctors when the component mounts
    fetchDoctors();
  }, []);

  return (
    <div>
      <h2>Manage Doctors</h2>
      <table>
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>Doctor Name</th>
            <th>Specialization</th>
            <th>License Number</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.firstName} {doctor.lastName}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.licenseNumber}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add doctor form */}
      <div>
        <h3>Add Doctor</h3>
        <input
          type="text"
          placeholder="First Name"
          value={newDoctor.firstName}
          onChange={(e) => setNewDoctor({ ...newDoctor, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newDoctor.lastName}
          onChange={(e) => setNewDoctor({ ...newDoctor, lastName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Specialization"
          value={newDoctor.specialization}
          onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
        />
        <input
          type="text"
          placeholder="License Number"
          value={newDoctor.licenseNumber}
          onChange={(e) => setNewDoctor({ ...newDoctor, licenseNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newDoctor.phone}
          onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newDoctor.email}
          onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
        />
        <button onClick={addDoctor}>Add Doctor</button>
      </div>
    </div>
  );
};

export default ManageDoctorsTable;
