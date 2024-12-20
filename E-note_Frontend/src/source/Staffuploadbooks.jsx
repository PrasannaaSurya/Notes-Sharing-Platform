import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StaffNavbar from './StaffNavbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Staffuploadbooks = () => {
  const location = useLocation();
  const { userID } = location.state || {}; // Access the userID from the state

  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('registerNumber', userID); // Send userID as registerNumber
    formData.append('image', image);
    formData.append('pdf', pdf);
    formData.append('description', description);

    try {
      // Make a POST request to the backend API
      const response = await fetch('http://localhost:6900/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Show success message
        toast.success('Upload successful!', {
          position: 'top-center',
          autoClose: 3000,
        });
        // Reload the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        throw new Error('Upload failed!');
      }
    } catch (error) {
      // Handle errors
      toast.error('Upload failed. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div style={styles.container}>
      <StaffNavbar />
      <br/><br /><br /><br />
      <div style={styles.content}>
        <h1 style={styles.title}><strong>UPLOAD FORMS</strong></h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="userID"><strong>USER ID</strong></label>
            <input
              type="text"
              id="userID"
              name="userID"
              value={userID || ''}
              disabled
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="image"><strong>IMAGE</strong></label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="pdf"><strong>PDF (Max size: 10MB)</strong></label>
            <input
              type="file"
              id="pdf"
              name="pdf"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="description"><strong>TITLE</strong></label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              style={styles.textarea}
            />
          </div>
          <button type="submit" style={styles.button}><strong>SUBMIT</strong></button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    padding: '20px',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 1)',
    textAlign: 'center',
    
  },
  title: {
    fontSize: '28px',
    marginBottom: '10px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: '15px',
    width: '100%',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
};

export default Staffuploadbooks;
