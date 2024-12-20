import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button, Form, Toast } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbars = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [studentRegisterNumber, setStudentRegisterNumber] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentConfirmPassword, setStudentConfirmPassword] = useState('');
  const [studentPhoneNumber, setStudentPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState({ show: false, message: '', variant: '' });

  // Password visibility states
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [showStudentConfirmPassword, setShowStudentConfirmPassword] = useState(false);
  const [showStaffPassword, setShowStaffPassword] = useState(false);

  const getBgColor = () => {
    switch (location.pathname) {
      case '/':
      case '/notes':
      case '/books':
      case '/pdfs':
        return '#1e1e1e';
      default:
        return '#343a40';
    }
  };

  const handleStudentLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:6900/api/students/login', null, {
        params: {
          registerNumber: studentRegisterNumber,
          password: studentPassword
        }
      });
      sessionStorage.setItem('registerNumber', studentRegisterNumber);
      setShowStudentModal(false);
      showToastMessage('Successfully logged in!', 'success', () => {
        navigate('/studenthomepage');
      });
    } catch (err) {
      setError('Invalid registration number or password');
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (studentPassword !== studentConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:6900/api/students/register', {
        name: studentName,
        registerNumber: studentRegisterNumber,
        email: studentEmail,
        phoneNumber: studentPhoneNumber,
        password: studentPassword
      });
      setShowRegisterModal(false);
      showToastMessage('Registration successful! You can now log in.', 'success', () => setShowStudentModal(true));
    } catch (err) {
      setError(err.response?.data || 'An error occurred');
    }
  };

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
      showToastMessage('Successfully logged in!', 'success', () => navigate('/adminhomepage'));
      setShowAdminModal(false);
    } else {
      setError('Invalid username or password');
    }
  };

  const handleStaffLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:6900/api/users/login', null, {
        params: {
          userID: username,
          password: password
        }
      });
      sessionStorage.setItem('userID', username);
      showToastMessage('Successfully logged in!', 'success', () => {
        navigate('/Staffhomepage');
      });
      setShowStaffModal(false);
    } catch (err) {
      setError('Invalid user ID or password');
    }
  };

  const showToastMessage = (message, variant, callback) => {
    setShowToast({ show: true, message, variant });
    setTimeout(() => {
      setShowToast({ show: false, message: '', variant: '' });
      callback();
    }, 4000); // Show toast for 4 seconds
  };

  return (
    <>
      <Navbar expand="lg" sticky="top" className="navbar">
        <Navbar.Brand as={Link} to="/" style={{ color: 'black' }}><strong>NOTES SHARING PLATFORM</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link style={{ color: 'black' }} onClick={() => setShowStudentModal(true)}>
              <strong>STUDENTS LOGIN</strong>
            </Nav.Link>
            <Nav.Link style={{ color: 'black' }} onClick={() => setShowStaffModal(true)}>
              <strong>STAFF LOGIN</strong>
            </Nav.Link>
            <Nav.Link style={{ color: 'black' }} onClick={() => setShowAdminModal(true)}>
              <strong>ADMIN LOGIN</strong>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Modal for Admin Login */}
      <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title><strong>ADMIN LOGIN</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdminLogin}>
            <Form.Group controlId="formUsername">
              <Form.Label><strong>USERNAME</strong></Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label><strong>PASSWORD</strong></Form.Label>
              <div style={{ position: 'relative' }}>
                <Form.Control 
                  type={showAdminPassword ? 'text' : 'password'} 
                  placeholder="Enter password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
                <span  className="password-toggle" onClick={() => setShowAdminPassword(!showAdminPassword)} style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}>
                  {showAdminPassword ? 'Hide' : 'Show'}
                </span>
              </div>
            </Form.Group>
            <br/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button variant="secondary" onClick={() => setShowAdminModal(false)} style={{ marginRight: '10px' }}>
              <strong>BACK</strong>
            </Button>
            <Button variant="success" type="submit">
              <strong>LOGIN</strong>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for Student Login */}
      <Modal show={showStudentModal} onHide={() => setShowStudentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title><strong>STUDENT LOGIN</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleStudentLogin}>
            <Form.Group controlId="formRegisterNumber">
              <Form.Label><strong>STUDENT_ID</strong></Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Student_ID (e.g: STU001)" 
                value={studentRegisterNumber} 
                onChange={(e) => setStudentRegisterNumber(e.target.value)} 
                required
              />
            </Form.Group>
            <Form.Group controlId="formStudentPassword">
              <Form.Label><strong>PASSWORD</strong></Form.Label>
              <div style={{ position: 'relative' }}>
                <Form.Control 
                  type={showStudentPassword ? 'text' : 'password'} 
                  placeholder="Enter password" 
                  value={studentPassword} 
                  onChange={(e) => setStudentPassword(e.target.value)} 
                  required
                />
                <span className="password-toggle"  onClick={() => setShowStudentPassword(!showStudentPassword)} style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}>
                  {showStudentPassword ? 'Hide' : 'Show'}
                </span>
              </div>
            </Form.Group>
            <br/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button variant="success" type="submit">
              <strong>LOGIN</strong>
            </Button>
            <Button variant="secondary" onClick={() => setShowStudentModal(false)} style={{ marginLeft: '10px' }}>
              <strong>BACK</strong>
            </Button>
            <br/><br/>
            <p>
              <a href="#" style={{ color: 'black' }} onClick={() => { 
                setShowStudentModal(false); 
                setShowRegisterModal(true); 
              }}>Not registered yet? Click here to register.</a>
            </p>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for Student Registration */}
      <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title><strong>STUDENT REGISTRATION</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formName">
              <Form.Label><strong>NAME</strong></Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter name" 
                value={studentName} 
                onChange={(e) => setStudentName(e.target.value)} 
                required
              />
            </Form.Group>
            <Form.Group controlId="formRegisterNumber">
              <Form.Label><strong>STUDENT_ID</strong></Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Student_ID (e.g STF001)" 
                value={studentRegisterNumber} 
                onChange={(e) => setStudentRegisterNumber(e.target.value)} 
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label><strong>EMAIL</strong></Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={studentEmail} 
                onChange={(e) => setStudentEmail(e.target.value)} 
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label><strong>PHONE NUMBER</strong></Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter phone number" 
                value={studentPhoneNumber} 
                onChange={(e) => setStudentPhoneNumber(e.target.value)} 
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label><strong>PASSWORD</strong></Form.Label>
              <div style={{ position: 'relative' }}>
                <Form.Control 
                  type={studentPassword ? 'text' : 'password'} 
                  placeholder="Enter password" 
                  value={studentPassword} 
                  onChange={(e) => setStudentPassword(e.target.value)} 
                  required
                />
                <span  className="password-toggle" onClick={() => setStudentPassword(!studentPassword)} style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}>
                  {studentPassword ? 'Hide' : 'Show'}
                </span>
              </div>
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label><strong>CONFIRM PASSWORD</strong></Form.Label>
              <div style={{ position: 'relative' }}>
                <Form.Control 
                  type={showStudentConfirmPassword ? 'text' : 'password'} 
                  placeholder="Confirm password" 
                  value={studentConfirmPassword} 
                  onChange={(e) => setStudentConfirmPassword(e.target.value)} 
                  required
                />
                <span className="password-toggle" onClick={() => setShowStudentConfirmPassword(!showStudentConfirmPassword)} style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}>
                  {showStudentConfirmPassword ? 'Hide' : 'Show'}
                </span>
              </div>
            </Form.Group>
            <br/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button variant="secondary" onClick={() => setShowRegisterModal(false)} style={{ marginRight: '10px' }}>
              <strong>BACK</strong>
            </Button>
            <Button variant="success" type="submit">
              <strong>REGISTER</strong>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for Staff Login */}
      <Modal show={showStaffModal} onHide={() => setShowStaffModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title><strong>STAFF LOGIN</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleStaffLogin}>
            <Form.Group controlId="formStaffUsername">
              <Form.Label><strong>USER ID</strong></Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter user ID" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
            </Form.Group>
            <Form.Group controlId="formStaffPassword">
              <Form.Label><strong>PASSWORD</strong></Form.Label>
              <div style={{ position: 'relative' }}>
                <Form.Control 
                  type={showStaffPassword ? 'text' : 'password'} 
                  placeholder="Enter password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
                <span className="password-toggle" onClick={() => setShowStaffPassword(!showStaffPassword)} style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}>
                  {showStaffPassword ? 'Hide' : 'Show'}
                </span>
              </div>
            </Form.Group>
            <br/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button variant="secondary" onClick={() => setShowStaffModal(false)} style={{ marginRight: '10px' }}>
              <strong>BACK</strong>
            </Button>
            <Button variant="success" type="submit">
              <strong>LOGIN</strong>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Toast Message */}
      <Toast 
        show={showToast.show} 
        onClose={() => setShowToast({ show: false, message: '', variant: '' })}
        bg={showToast.variant} 
        style={{ position: 'fixed', top: '120px', right: '20px' }}
      >
        <Toast.Body>{showToast.message}</Toast.Body>
      </Toast>
    </>
  );
};

export default Navbars;
