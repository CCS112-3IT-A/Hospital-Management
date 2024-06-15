import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import AddAppointment from '../Functions/Appointments/addAppointment';
import UpdateAppointment from '../Functions/Appointments/updateAppointment';

function ManageDoctorAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/compareEmailsAndPatientIds');
      const data = await response.json();

      if (response.ok) {
        setAppointments(data.matching_medical_records || []);
      } else {
        setError(data.error || 'Failed to fetch doctor appointments');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
      setError('Failed to fetch doctor appointments');
      setLoading(false);
    }
  };

  const refetchAppointments = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/compareEmailsAndPatientIds');
      const data = await response.json();

      if (response.ok) {
        setAppointments(data.matching_medical_records || []);
      } else {
        setError(data.error || 'Failed to refetch doctor appointments');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error refetching doctor appointments:', error);
      setError('Failed to refetch doctor appointments');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Manage Doctor Appointments</h1>
      <AddAppointment refetchAppointments={refetchAppointments} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient ID</th>
            <th>Appointment Date</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.appointment_id}</td>
              <td>{appointment.patient_id}</td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.status || 'Pending'}</td>
              <td>{appointment.reason}</td>
              <td>
                <UpdateAppointment
                  appointment={appointment}
                  refetchAppointments={refetchAppointments}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ManageDoctorAppointment;