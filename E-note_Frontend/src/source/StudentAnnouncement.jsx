import React, { useState, useEffect } from 'react';
import StudentNavbar from './StudentNavbar';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';

function StudentAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:6900/api/announcements');
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        } else {
          throw new Error('Failed to fetch announcements');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div>
      <StudentNavbar />
      <Container className="announcement-container"><br /><br /><br /><br />
        <h2 className="text-center mb-4"><strong>ANNOUNCEMENTS</strong></h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : (
          <div className="announcement-grid">
            {announcements.map((ann) => (
              <Card key={ann.id} className="announcement-card">
                <Card.Body>
                  <Card.Title>Announcement {ann.id}</Card.Title>
                  <Card.Text>{ann.message}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Container>
      <style jsx>{`
        .announcement-container {
          padding: 2rem;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .announcement-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .announcement-card {
          border-radius: 0.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
          background-color: #ffffff;
        }

        .announcement-card:hover {
          transform: translateY(-5px);
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

export default StudentAnnouncement;
