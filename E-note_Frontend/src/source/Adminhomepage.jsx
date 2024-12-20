import React from 'react';
import { Button } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Adminhomepage = () => {
  const handleGetStarted = () => {
    console.log('Get Started button clicked!');
  };

  return (
    <div>
      <AdminNavbar/>
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.header}><strong>WELCOME TO ADMIN DASHBOARD</strong></h1>
          <p style={styles.paragraph}>Manage your resources effectively. Upload, download, and manage books, PDFs, and more with ease.</p>
          <Button 
            variant="primary" 
            onClick={handleGetStarted} 
            style={styles.button}
            className="animate-button"
          >
            <i className="fas fa-play"></i><strong>GET STARTED</strong>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Define internal CSS as a JavaScript object
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    textAlign: 'center',
    animation: 'fadeIn 1s ease-in-out',
  },
  header: {
    marginBottom: '20px',
    fontSize: '2.5rem',
    animation: 'slideInFromLeft 1s ease-out',
  },
  paragraph: {
    marginBottom: '30px',
    fontSize: '1.2rem',
    animation: 'slideInFromRight 1s ease-out',
  },
  button: {
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@keyframes slideInFromLeft': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
  '@keyframes slideInFromRight': {
    '0%': {
      opacity: 0,
      transform: 'translateX(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
};

// Add CSS class for button hover effect
const buttonHoverStyles = `
  .animate-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

// Inject hover styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = buttonHoverStyles;
document.head.appendChild(styleSheet);

export default Adminhomepage;
