import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaBook, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import StaffNavbar from './StaffNavbar';

function StaffHomepage() {
  const location = useLocation();
  const registerNumber = location.state?.registerNumber;

  // Log the register number to the console
  console.log('Logged in with Register Number:', registerNumber);

  return (
    <div>
      <StaffNavbar /><br /><br />
      <div style={styles.container}>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={styles.title}
        >
          Welcome, Staff Member
        </motion.h1>
        {registerNumber && (
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={styles.subtitle}
          >
            Logged in with Register Number: {registerNumber}
          </motion.h2>
        )}
          <div style={styles.iconsContainer}>
          <Link to="/managebooks" style={{ textDecoration: 'none' }}> {/* Add Link to Manage Books */}
            <motion.div
              style={styles.iconCard}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <FaBook style={styles.icon} />
              <h2 style={styles.heading}>Manage Notes</h2>
            </motion.div>
          </Link>
          <Link to="/staffstudentdetails" style={{ textDecoration: 'none' }}> {/* Add Link to Manage Books */}
          <motion.div
            style={styles.iconCard}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaUsers style={styles.icon} />
            <h2 style={styles.heading}>Student details</h2>
          </motion.div>
          </Link>
          {/* <motion.div
            style={styles.iconCard}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaCog style={styles.icon} />
            <h2 style={styles.heading}>Settings</h2>
          </motion.div>
          <motion.div
            style={styles.iconCard}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaChartBar style={styles.icon} />
            <h2 style={styles.heading}>Analytics</h2>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    color: '#333',
    textAlign: 'center',
    padding: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    color: '#333',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#555',
  },
  iconsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  iconCard: {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    width: '220px',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s, border 0.3s',
    cursor: 'pointer',
    border: '2px solid transparent',
    transform: 'scale(1)',
    position: 'relative',
  },
  icon: {
    fontSize: '3rem',
    color: '#007bff',
    transition: 'color 0.3s',
  },
  heading: {
    marginTop: '1rem',
    fontSize: '1.2rem',
    color: '#333',
  },
};

export default StaffHomepage;
