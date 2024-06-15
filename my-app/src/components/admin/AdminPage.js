import React, { useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { FaBars, FaUserMd, FaUserCog } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css';
import Account from './manageAccounts';
import Doctor from './manageDoctors';
import Patient from './managePatient';
import Appointment from './ViewAppointment';
import MedicalR from './ViewMedicalRecord';



function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Hospital Management System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar}>
            <FaBars />
          </Navbar.Toggle>
        </Container>
      </Navbar>

      <div className="content-wrapper">
        <div className={`sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
          <Nav className="flex-column">
            <Nav.Link className="sidebar-link" onClick={() => handleViewChange('manageAccount')}>
              <FaUserCog /> <span>Manage Account</span>
            </Nav.Link>

            <Nav.Link className="sidebar-link" onClick={() => handleViewChange('managePatient')}>
              <FaUserMd /> <span>Manage Patient</span>
            </Nav.Link>

            <Nav.Link className="sidebar-link" onClick={() => handleViewChange('manageDoctors')}>
              <FaUserMd /> <span>Manage Doctors</span>
            </Nav.Link>

            <Nav.Link className="sidebar-link" onClick={() => handleViewChange('viewAppointment')}>
              <FaUserMd /> <span>View Appointments</span>
            </Nav.Link>

            <Nav.Link className="sidebar-link" onClick={() => handleViewChange('viewMedicalR')}>
              <FaUserMd /> <span>View Medical Records</span>
            </Nav.Link>
            




          </Nav>
        </div>
        <div className="main-content-wrapper">
          {currentView === 'manageAccount' && <Account />}
          {currentView === 'managePatient' && <Patient />}
          {currentView === 'manageDoctors' && <Doctor />} 
          {currentView === 'viewAppointment' && <Appointment />} 
          {currentView === 'viewMedicalR' && <MedicalR />} 
        </div>
      </div>
    </div>
  );
}

export default Admin;
