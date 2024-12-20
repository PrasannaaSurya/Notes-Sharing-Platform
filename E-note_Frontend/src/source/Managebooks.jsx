import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffNavbar from './StaffNavbar';
import axios from 'axios';

function Managebooks() {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:6900/api/files/all')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFiles(data);
          setFilteredFiles(data);
        } else {
          throw new Error('Unexpected response format');
        }
      })
      .catch(error => {
        console.error('Error fetching files:', error);
        toast.error('Failed to load files.');
        setError('Failed to load files.');
      });
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      setFilteredFiles(files.filter(file => 
        file.description.toLowerCase().includes(query)
      ));
    } else {
      setFilteredFiles(files);
    }
  };

  const handleViewClick = (pdfFileName) => {
    const apiURL = `http://localhost:6900/api/files/download/${encodeURIComponent(pdfFileName)}`;

    axios(apiURL, {
      method: 'GET',
      responseType: 'blob' // Force to receive data in a Blob Format
    })
    .then(response => {
      // Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: 'application/pdf' });
      // Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      // Open the URL in a new window
      window.open(fileURL);
    })
    .catch(error => {
      console.log('Error fetching the PDF:', error);
      toast.error('Failed to load the PDF.');
    });
  };

  return (
    <div>
      <StaffNavbar/><br /><br /><br />
      <div style={styles.container}>
        <h1 style={styles.title}><strong>NOTES AVAILABLE</strong></h1>
        {error && <p style={styles.error}>{error}</p>}
        
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by description..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.cardContainer}>
          {filteredFiles.length > 0 ? (
            filteredFiles.map(file => (
              <div key={file.id} style={styles.card}>
                {file.imageFileName && (
                  <img 
                    src={`http://localhost:6900/api/files/download/${encodeURIComponent(file.imageFileName)}`}
                    alt={file.description}
                    style={styles.cardImage}
                  />
                )}
                <p style={styles.cardDescription}>{file.description}</p>
                <button onClick={() => handleViewClick(file.pdfFileName)} style={styles.viewButton}>
                  View PDF
                </button>
              </div>
            ))
          ) : (
            <p style={styles.noFiles}>No files available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#333',
  },
  searchContainer: {
    marginBottom: '20px',
    width: '100%',
    maxWidth: '600px',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1200px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    overflow: 'hidden',
    border: '1px solid #ddd',
  },
  cardImage: {
    width: '100%',
    height: '200px', // Fixed height for images
    objectFit: 'cover', // Ensures the image covers the container without stretching
    borderRadius: '8px',
    marginBottom: '15px',
  },
  cardDescription: {
    fontSize: '16px',
    marginBottom: '15px',
    color: '#555',
  },
  noFiles: {
    fontSize: '18px',
    color: '#777',
  },
  error: {
    color: 'red',
    fontSize: '16px',
    marginBottom: '20px',
  },
  viewButton: {
    padding: '10px 15px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Managebooks;
