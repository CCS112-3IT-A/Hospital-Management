import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const item = { email, password };
      const result = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(item),
      });

      const data = await result.json();

      if (data.error) {
        setError(data.error);
      } else {
        localStorage.setItem('user-info', JSON.stringify(data));

        if (data.role === 'admin') {
          navigate('/adminSide');
        } else if (data.role === 'doctor') {
          navigate('/doctorside');
        } else if (data.role === 'receptionist') {
          navigate('/receptionistside');
        } else {
          navigate('/patientside');
        }
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('An error occurred while logging in');
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">Hospital Management System</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="my-5">
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1 className="text-center mb-4">Login</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <Button variant="primary" type="submit" className="mt-3">
                  Login
                </Button>
                <Link  className="mt-3">
                  Don't have an account? Register now
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;