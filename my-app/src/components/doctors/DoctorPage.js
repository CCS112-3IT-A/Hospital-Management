import React, { useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { FaBars, FaUserMd, FaUserCog } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../admin/admin.css';
import Patient from './ViewPatient';
import Appointment from './ManageAppointment';
import MedicalR from './ManageMedicalR';




function DoctorPage() {
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
            <Nav.Link className="sidebar-link" onClick={() => handleViewChange('ManagePatient')}>
              <FaUserCog /> <span>Manage Patient</span>
            </Nav.Link>

            <Nav.Link className="sidebar-link" onClick={() => handleViewChange('ManageAppointment')}>
              <FaUserMd /> <span> Manage Appointment</span>
            </Nav.Link>

            <Nav.Link className="sidebar-link" onClick={() => handleViewChange('ManageMedicalR')}>
              <FaUserMd /> <span> Manage Medical Records</span>
            </Nav.Link>
           

  
          </Nav>
        </div>
        <div className="main-content-wrapper">
          {currentView === 'ManagePatient' && <Patient />}
          {currentView === 'ManageAppointment' && <Appointment />}
          {currentView === 'ManageMedicalR' && <MedicalR />}

          
        </div>
      </div>
    </div>
  );
}

export default DoctorPage;
