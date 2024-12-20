import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner, Table } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import { BsMegaphone } from 'react-icons/bs';

function Announcements() {
  const [announcement, setAnnouncement] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    // Fetch all announcements on component mount
    const fetchAnnouncements = async () => {
      setFetching(true);
      try {
        const response = await fetch('http://localhost:6900/api/announcements');
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        } else {
          console.error('Failed to fetch announcements');
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setFetching(false);
      }
    };

    fetchAnnouncements();
  }, [submitted]); // Refetch announcements when new one is submitted

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);
    try {
      await fetch('http://localhost:6900/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: announcement }),
      });
      setSubmitted(true);
      setAnnouncement('');
      // Refetch announcements after submission
      const response = await fetch('http://localhost:6900/api/announcements');
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data);
      }
    } catch (error) {
      console.error('Error submitting announcement:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <br/>
      <Container className="announcement-container">
        <div className="form-wrapper">
          <div className="text-center mb-4">
            <h2 className="mb-3"><strong>MAKE AN ANNOUNCEMENT</strong></h2>
            <BsMegaphone size={50} className="text-primary" />
          </div>
          <Form onSubmit={handleSubmit} className="announcement-form">
            {loading && (
              <div className="text-center mb-4">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {submitted && !loading && (
              <Alert variant="success" className="mb-4">
                Announcement submitted successfully!
              </Alert>
            )}
            <Form.Group controlId="announcementForm.ControlTextarea1">
              <Form.Label><strong>ANNOUNCEMENT</strong></Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                placeholder="Write your announcement here..."
                required
                style={{ backgroundColor: '#ffffff' }} // Set input background color to white
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              <strong>SUBMIT</strong>
            </Button>
          </Form>
        </div>

        <div className="mt-5 table-container">
          <h3><strong>ALL ANNOUNCEMENTS</strong></h3>
          {fetching ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Announcement</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((ann) => (
                  <tr key={ann.id}>
                    <td>{ann.id}</td>
                    <td>{ann.message}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Container>

      <style jsx>{`
        .announcement-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding: 5rem;
          background-color: #f1f1f1;
        }

        .form-wrapper {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          border: 1px solid #ddd;
          border-radius: 0.5rem;
          background-color: #ffffff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          animation: fadeIn 1s ease-in-out;
        }

        .announcement-form {
          padding: 1rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .text-primary {
          color: #007bff;
        }

        .table-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        .table-container h3 {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .form-control {
          background-color: #ffffff; /* Ensures the background color of input fields is white */
          box-shadow: 2px 2px 2px 2px gray;
        }

        @media (max-width: 768px) {
          .announcement-container {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Announcements;
