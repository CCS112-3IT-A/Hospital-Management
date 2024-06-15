import React, { useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { FaBars, FaUserMd, FaUserCog } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../admin/admin.css';
import Schedule from './Schedule';
import Receptionist from './ReceptionistPatient';




function ReceptionistSide() {
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
            <Nav.Link className="sidebar-link" onClick={() => handleViewChange('Receptionist')}>
              <FaUserCog /> <span>Manage Patients</span>
            </Nav.Link>

            <Nav.Link className="sidebar-link" onClick={() => handleViewChange('Schedule')}>
              <FaUserMd /> <span> Manage Appointment</span>
            </Nav.Link>

           

  
          </Nav>
        </div>
        <div className="main-content-wrapper">
          {currentView === 'Receptionist' && <Receptionist />}
          {currentView === 'Schedule' && <Schedule />}
          
        </div>
      </div>
    </div>
  );
}

export default ReceptionistSide;
