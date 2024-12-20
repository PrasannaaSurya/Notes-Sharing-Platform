import React, { useState, useEffect } from 'react';
import { Table, Container, Spinner, Button, Modal } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

function BooksNotesDetails() {
  const [fileUploads, setFileUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fileIdToDelete, setFileIdToDelete] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:6900/api/files/all'); // Adjust URL if needed
        if (response.ok) {
          const data = await response.json();
          setFileUploads(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle file deletion
  const handleDelete = async () => {
    if (fileIdToDelete === null) return;

    try {
      const response = await fetch(`http://localhost:6900/api/files/${fileIdToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted file from the state
        setFileUploads(fileUploads.filter(fileUpload => fileUpload.id !== fileIdToDelete));
        setShowModal(false); // Close the modal after deletion
      } else {
        throw new Error('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div>
        <AdminNavbar />
        <Container className="my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AdminNavbar />
        <Container className="my-4">
          <br /><br /><br /><br />
          <div className="alert alert-danger" role="alert">
            <br />Error: {error}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <AdminNavbar />
      <br />
      <br />
      <Container>
        <h1 className="my-4"><strong>NOTES DETAILS</strong></h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>REGISTER NUMBER</th>
              <th>IMAGE</th>
              <th>PDF DETAILS</th>
              <th>DESCRIPTION</th>
              <th>ACTION</th> {/* Added Action column */}
            </tr>
          </thead>
          <tbody>
            {fileUploads.map((fileUpload) => (
              <tr key={fileUpload.id}>
                <td>{fileUpload.id}</td>
                <td>{fileUpload.registerNumber}</td>
                <td>{fileUpload.imageFileName}</td>
                <td>{fileUpload.pdfFileName}</td>
                <td>{fileUpload.description}</td>
                <td>
                  <Button variant="danger" onClick={() => {
                    setFileIdToDelete(fileUpload.id);
                    setShowModal(true);
                  }}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this entry?</Modal.Body>
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

export default BooksNotesDetails;
