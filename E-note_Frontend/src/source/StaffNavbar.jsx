import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';

const StaffNavbar = () => {
  const navigate = useNavigate();
  const userID = sessionStorage.getItem('userID'); // Get userID from session storage

  const handleLogout = () => {
    console.log('Logging out...');
    sessionStorage.removeItem('userID'); // Clear session storage on logout
    navigate('/'); // Redirect to home page
  };

  const handleNavigation = (path) => {
    navigate(path, { state: { userID } });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={styles.navbar}>
      <Navbar.Brand style={styles.brand}>
        <h1 style={styles.title}><strong>STAFF DASHBOARD</strong></h1>
        {userID && <p style={styles.userID}><strong>{userID}</strong></p>}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={styles.menu}>
          <Nav.Link onClick={() => handleNavigation('/Staffhomepage')} style={styles.link}>
            <i className="fas fa-home" style={styles.icon}></i> <strong>HOME</strong>
          </Nav.Link>
          <Nav.Link onClick={() => handleNavigation('/managebooks')} style={styles.link}>
            <i className="fas fa-book" style={styles.icon}></i> <strong>NOTES</strong>
          </Nav.Link>
          <Nav.Link onClick={() => handleNavigation('/staffstudentdetails')} style={styles.link}>
            <i className="fas fa-users" style={styles.icon}></i> <strong>STUDENT DETAILS</strong>
          </Nav.Link>
          <Nav.Link onClick={() => handleNavigation('/staffupload')} style={styles.link}>
            <i className="fas fa-upload" style={styles.icon}></i> <strong>UPLOAD NOTES</strong>
          </Nav.Link>
          <Nav.Link onClick={() => handleNavigation('/staffannouncement')} style={styles.link}>
            <i className="fas fa-bullhorn" style={styles.icon}></i> <strong>ANNOUNCEMENT</strong>
          </Nav.Link>
          <Nav.Link onClick={() => handleNavigation('/staffprofile')} style={styles.link}>
            <i className="fas fa-user-circle" style={styles.icon}></i> <strong>PROFILE</strong>
          </Nav.Link>
          <Button onClick={handleLogout} style={styles.logoutButton}>
            <i className="fas fa-sign-out-alt" style={styles.icon}></i> <strong>LOG OUT</strong>
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const styles = {
  navbar: {
    padding: '10px 15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '20px', // Reduced size
    fontFamily: 'Arial, sans-serif',
    letterSpacing: '1px',
    marginRight: '10px',
  },
  userID: {
    margin: 0,
    fontSize: '14px', // Reduced size
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
    fontSize: '16px', // Reduced size
    fontFamily: 'Arial, sans-serif',
    transition: 'color 0.3s ease, transform 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '6px', // Reduced spacing
  },
  logoutButton: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '16px', // Reduced size
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.3s ease, transform 0.3s ease',
  },
};

export default StaffNavbar;
