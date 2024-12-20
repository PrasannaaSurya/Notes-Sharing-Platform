import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Table, Container, Button, Modal } from 'react-bootstrap';

function AdminStaffdetails() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:6900/api/users'); // Adjust URL as needed
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (userIdToDelete === null) return;

    try {
      const response = await fetch(`http://localhost:6900/api/users/${userIdToDelete}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter(user => user.id !== userIdToDelete));
      setShowModal(false); // Close modal after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <Container>
        <br /><br /><br /><br />
        <h2 className="my-4"><strong>STAFF DETAILS</strong></h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER ID</th>
                <th>PASSWORD</th>
                <th>FULL NAME</th>
                <th>PHONE NUMBER</th>
                <th>DEPARTMENT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userID}</td>
                  <td>{user.password}</td>
                  <td>{user.name}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.department}</td>
                  <td>
                    <Button variant="danger" onClick={() => {
                      setUserIdToDelete(user.id);
                      setShowModal(true);
                    }}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete the staff details?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminStaffdetails;
