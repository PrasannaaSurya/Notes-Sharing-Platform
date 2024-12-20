import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';

function StudentNavbar() {
  const navigate = useNavigate();
  const registerNumber = sessionStorage.getItem('registerNumber');

  const handleLogout = () => {
    console.log('Logging out...');
    sessionStorage.removeItem('registerNumber'); // Clear session storage on logout
    navigate('/'); // Redirect to home page
  };


  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={styles.navbar}>
      <Navbar.Brand style={styles.brand}>
        <h1 style={styles.title}><strong>STUDENT DASHBOARD</strong></h1>
        {registerNumber && <p style={styles.registerNumber}><strong>{registerNumber}</strong></p>}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={styles.menu}>
          <Nav.Link href="/studenthomepage" style={styles.link}>
            <i className="fas fa-home" style={styles.icon}></i> <strong>HOME PAGE</strong>
          </Nav.Link>
          <Nav.Link href="/uploadpdf" style={styles.link}>
            <i className="fas fa-upload" style={styles.icon}></i> <strong>UPLOAD FILES</strong>
          </Nav.Link>
          <Nav.Link href="/downloadfiles" style={styles.link}>
            <i className="fas fa-download" style={styles.icon}></i> <strong>DOWNLOAD FILES</strong>
          </Nav.Link>
          <Nav.Link href="/announcements1" style={styles.link}>
            <i className="fas fa-download" style={styles.icon}></i> <strong>ANNOUNCEMENTS</strong>
          </Nav.Link>
          <Nav.Link href="/StudentProfile" style={styles.link}>
            <i className="fas fa-user-circle" style={styles.icon}></i> <strong>PROFILE</strong>
          </Nav.Link>
          <Button onClick={handleLogout} style={styles.logoutButton}>
            <i className="fas fa-sign-out-alt" style={styles.icon}></i> <strong>LOG OUT</strong>
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const styles = {
  navbar: {
    padding: '10px 20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif',
    letterSpacing: '1px',
    marginRight: '10px',
  },
  registerNumber: {
    margin: 0,
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    color: 'lightgrey',
  },
  menu: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif',
    transition: 'color 0.3s ease, transform 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '8px',
  },
  logoutButton: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.3s ease, transform 0.3s ease',
  },
};

export default StudentNavbar;
