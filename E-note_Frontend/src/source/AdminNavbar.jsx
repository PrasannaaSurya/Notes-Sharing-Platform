import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom'; // For navigation between routes

const AdminNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand as={Link} to="/" className="navbar-brand">
        <strong>ADMIN DASHBOARD</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="admin-navbar-nav" />
      <Navbar.Collapse id="admin-navbar-nav">
        <Nav className="ms-auto">
        </Nav>
        <Nav className="ms-auto">
        <Nav.Link as={Link} to="/adminhomepage"><strong>HOMEPAGE</strong></Nav.Link>
          <Nav.Link as={Link} to="/studentdetails"><strong>STUDENT DETAILS</strong></Nav.Link>
          <Nav.Link as={Link} to="/AdminStaffuploaddetails"><strong>ADD STAFF CREDENTIALS</strong></Nav.Link>
          <Nav.Link as={Link} to="/AdminStaffdetails"><strong>STAFF DETAILS</strong></Nav.Link>
          <Nav.Link as={Link} to="/booksnotesdetails"><strong>NOTES DETAILS</strong></Nav.Link>
          <Nav.Link as={Link} to="/announcements"><strong>ANNOUNCEMENTS</strong></Nav.Link>
          <Nav.Link as={Link} to="/"><strong>LOGOUT</strong></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
