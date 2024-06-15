import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/getAppointment');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div>
      <h2>Appointments</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Appointment Date</th>
            <th>Status</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.patient_id}</td>
              <td>{appointment.doctor_id}</td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.status || 'Pending'}</td>
              <td>{appointment.reason}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ViewAppointments;