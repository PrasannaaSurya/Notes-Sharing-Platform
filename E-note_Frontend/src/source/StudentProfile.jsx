import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaEdit, FaTrash } from 'react-icons/fa';
import avatar from './pro.jpg'; // Replace with the correct path to your avatar image
import StudentNavbar from './StudentNavbar'; // Your navbar component

const StudentProfile = () => {
  const registerNumber = sessionStorage.getItem('registerNumber'); // Get register number from sessionStorage
  const [students, setStudents] = useState([]);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    fetch('http://localhost:6900/api/students')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        console.log('Fetched students:', data);
        setStudents(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Log register number
  console.log('Register Number:', registerNumber);
  
  // Compute currentStudent based on registerNumber
  const currentStudent = students.find(student => student.registerNumber === registerNumber);
  console.log('Current Student:', currentStudent); // Log currentStudent
  
  // Log all student register numbers
  students.forEach(student => console.log('Student Register Number:', student.registerNumber)); // Log register numbers
  
  // Handle deletion of a student
  const handleDelete = async () => {
    if (studentIdToDelete === null) return;
    try {
      const response = await fetch(`http://localhost:6900/api/students/${studentIdToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setStudents(students.filter((student) => student.id !== studentIdToDelete));
        setShowModal(false);
      } else {
        console.error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Handle updating a student's details
  const handleUpdate = async (updatedStudent) => {
    try {
      console.log('Updating student:', updatedStudent); // Debug log
      const response = await fetch(`http://localhost:6900/api/students/${updatedStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent),
      });
      if (response.ok) {
        const updatedStudents = students.map((student) => (student.id === updatedStudent.id ? updatedStudent : student));
        setStudents(updatedStudents);
        setShowModal(false);
        setShowSuccessDialog(true);
        setTimeout(() => setShowSuccessDialog(false), 2000);
      } else {
        console.error('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Handle form submission for editing
  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleUpdate(editingStudent);
  };

  return (
    <div style={styles.container}>
      <StudentNavbar /><br /><br /><br /><br />
      <h1 style={styles.header}>Your Profile</h1>
      {currentStudent && (
        <div key={currentStudent.id} style={styles.profileCard}>
          <img src={avatar} alt={`${currentStudent.name}'s avatar`} style={styles.avatar} />
          <h2 style={styles.name}>{currentStudent.name}</h2>
          <div style={styles.buttonContainer}>
            <div style={styles.iconButton} onClick={() => { setEditingStudent(currentStudent); setShowModal(true); }}>
              <FaEdit />
              <span style={styles.buttonLabel}>Edit</span>
            </div>
            <div style={styles.iconButton} onClick={() => { setStudentIdToDelete(currentStudent.id); handleDelete(); }}>
              <FaTrash />
              <span style={styles.buttonLabel}>Delete</span>
            </div>
          </div>
        </div>
      )}
      {showModal && editingStudent && (
        <div style={styles.modal}>
          <h2>Edit Profile</h2>
          <form onSubmit={handleEditSubmit}>
            <label style={styles.modalLabel}>
              Name:
              <input
                type="text"
                value={editingStudent.name}
                onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                required
                style={styles.input}
              />
            </label>
            <label style={styles.modalLabel}>
              Password:
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={editingStudent.password || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, password: e.target.value })}
                  required
                  style={styles.input}
                />
                <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </label>
            <div style={styles.modalButtons}>
              <button type="submit" style={styles.button}>Save</button>
              <button type="button" onClick={() => setShowModal(false)} style={styles.button}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {showSuccessDialog && (
        <div style={styles.dialogBox}>
          <p>Updated successfully</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
    padding: '20px',
  },
  header: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff8d4',
    borderRadius: '16px',
    padding: '20px',
    width: '300px',
    marginBottom: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  name: {
    fontSize: '1.5em',
    margin: '10px 0 20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.2em',
    cursor: 'pointer',
    color: '#555',
  },
  buttonLabel: {
    marginLeft: '8px',
    fontSize: '0.9em',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '30px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    zIndex: 1000,
    width: '400px',
  },
  modalLabel: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  eyeIcon: {
    marginLeft: '10px',
    cursor: 'pointer',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  dialogBox: {
    position: 'fixed',
    bottom: '20px',
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
};

export default StudentProfile;
