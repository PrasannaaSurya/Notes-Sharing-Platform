import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaDownload } from 'react-icons/fa';
import StudentNavbar from './StudentNavbar';

function Downloadfiles() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:6900/api/files/all')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFiles(data);
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

  const handleDownload = (fileName) => {
    fetch(`http://localhost:6900/api/files/download/${encodeURIComponent(fileName)}`)
      .then(response => {
        if (response.ok) {
          return response.blob();
        } else if (response.status === 404) {
          throw new Error('File not found');
        } else {
          throw new Error('File download failed');
        }
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => {
        console.error('Error downloading file:', error);
        toast.error('Failed to download file.');
      });
  };

  const filteredFiles = files.filter(file =>
    file.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <StudentNavbar/><br /><br /><br />
      <div style={styles.container}>
        <h1 style={styles.title}><strong>AVAILABLE FILES</strong></h1>
        {error && <p style={styles.error}>{error}</p>}
        
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              
                <button
                  style={styles.downloadButton}
                  onClick={() => handleDownload(file.pdfFileName)}
                  title="Download PDF"
                >
                  <FaDownload /><strong>DOWNLOAD PDF</strong>
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
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  cardDescription: {
    fontSize: '16px',
    marginBottom: '15px',
    color: '#555',
  },
  downloadButton: {
    backgroundColor: '#097969',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s, transform 0.3s',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px',
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
};

export default Downloadfiles;
