import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

function ViewMedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/getRecord');
      if (!response.ok) {
        throw new Error('Failed to fetch medical records');
      }
      const data = await response.json();
      console.log(data); // Log the data to inspect it
  
      // Check if the data has a 'records' property
      if (data.records) {
        setRecords(data.records);
      }
      // Check if the data has a 'data' property with an array of records
      else if (data.data && Array.isArray(data.data)) {
        setRecords(data.data);
      }
      // Check if the data is an array itself
      else if (Array.isArray(data)) {
        setRecords(data);
      } else {
        console.error('Unexpected data structure:', data);
        setError('Failed to fetch medical records');
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching medical records:', error);
      setError('Failed to fetch medical records');
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
      <h2>Medical Records</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Visit Date</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.patient_id}</td>
              <td>{record.doctor_id}</td>
              <td>{record.visit_date}</td>
              <td>{record.diagnosis}</td>
              <td>{record.treatment}</td>
              <td>{record.notes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ViewMedicalRecords;
