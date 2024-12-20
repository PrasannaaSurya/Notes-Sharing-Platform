import React, { useState, useEffect } from 'react';
import { Table, Form, Container, Row, Col, InputGroup, Button, Modal } from 'react-bootstrap';
import StaffNavbar from './StaffNavbar';

function Staffstudentdetails() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);

  useEffect(() => {
    fetch('http://localhost:6900/api/students') // Update with your actual API URL
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const confirmDelete = (id) => {
    setStudentIdToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (studentIdToDelete === null) return;

    try {
      const response = await fetch(`http://localhost:6900/api/students/${studentIdToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStudents(students.filter(student => student.id !== studentIdToDelete));
        setShowModal(false); // Close the modal after deletion
      } else {
        console.error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const filteredStudents = students.filter(student =>
    student.registerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phoneNumber.includes(searchTerm)
  );

  return (
    <div>
      <StaffNavbar />
      <br /><br /><br /><br />
      <Container className="student-details-container">
        <Row className="mb-3">
          <Col>
            <h1><strong>STUDENT DETAILS</strong></h1>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search by ID, Name, Email, or Phone Number"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              <InputGroup.Text className="search-icon">
                <i className="fas fa-search"></i>
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        {filteredStudents.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <Table striped bordered hover responsive className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>STUDENT_ID</th>
                <th>FULL NAME</th>
                <th>EMAIL</th>
                <th>PHONE NUMBER</th>
                <th>PASSWORD</th>
                <th>ACTION</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.registerNumber}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phoneNumber}</td>
                  <td>{student.password}</td>
                  <td>
                    <Button variant="danger" onClick={() => confirmDelete(student.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Modal for confirmation */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <style jsx>{`
          .student-details-container {
            margin: 20px;
            font-family: Arial, sans-serif;
          }

          .student-table {
            margin-top: 20px;
          }

          .table-responsive {
            margin-left: 10%;
          }

          input.search-input.form-control {
            margin-left: 10%;
          }

          .student-details-container h1 {
            text-align: center;
            margin-bottom: 20px;
          }

          .search-input {
            background-color: #ffffff; /* White background color */
            border: 1px solid #ced4da; /* Light border color */
            border-radius: .25rem; /* Rounded corners */
          }

          .search-icon {
            background-color: #ffffff; /* Match background color */
            border-left: 1px solid #ced4da; /* Border to separate icon from input */
          }

          .search-icon .fas {
            color: #6c757d; /* Gray color for the icon */
          }
        `}</style>
      </Container>
    </div>
  );
}

export default Staffstudentdetails;
