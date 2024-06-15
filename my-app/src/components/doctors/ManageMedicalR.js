import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import AddRecord from '../Functions/Medical Records/addMedicalR';
import UpdateMedicalRec from '../Functions/Medical Records/updateMedicalR';
import RemoveRecord from '../Functions/Medical Records/removeMedicalR';

function MedicalRecordDoctor() {
  const [records, setRecords] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/getRecord');
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const refetchRecords = fetchRecords;

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleShowUpdateModal = (record) => {
    setSelectedRecord(record);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedRecord(null);
  };

  const handleRemoveSuccess = () => {
    refetchRecords();
  };

  return (
    <div>
      <h2>Medical Records</h2>
      <Button variant="primary" onClick={handleShowAddModal}>
        Add Record
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Date</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Notes</th>
            <th>Actions</th>
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
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleShowUpdateModal(record)}
                >
                  Update
                </Button>
                <RemoveRecord
                  recordId={record.id}
                  onRemoveSuccess={handleRemoveSuccess}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddRecord show={showAddModal} onClose={handleCloseAddModal} />
      {selectedRecord && (
        <UpdateMedicalRec
          show={showUpdateModal}
          onClose={handleCloseUpdateModal}
          record={selectedRecord}
          refetchRecords={refetchRecords}
        />
      )}
    </div>
  );
}

export default MedicalRecordDoctor;
