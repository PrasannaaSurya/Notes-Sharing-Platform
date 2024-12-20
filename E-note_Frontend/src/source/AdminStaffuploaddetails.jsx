import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';

function AdminStaffuploaddetails() {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(''); // Clear previous message
    if (!/^\d{10}$/.test(phoneNumber)) {
      setMessage('Phone number must be exactly 10 digits.');
      setIsSubmitting(false);
      return;
    }
    if (!/^STF\d{3}$/.test(userID)) {
      setMessage("User ID must be in the format STF001.");
      setIsSubmitting(false); // corrected here
      return;
  }
  
    const apiUrl = 'http://localhost:6900/api/users'; // Replace with your backend URL

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID,
          password,
          name,
          phoneNumber,
          department,
        }),
      });

      if (response.ok) {
        setMessage('STAFF credentials created successfully!');
      } else {
        const errorData = await response.json();
        setMessage(`Failed to submit the form: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage(`Failed to submit the form: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      setUserID('');
      setPassword('');
      setName('');
      setPhoneNumber('');
      setDepartment('');
    }
  };

  return (
    <div>
      <AdminNavbar/>
      <br/>
      <br/>
      <div className="admin-container">
    
        <div className="form-wrapper">
      
          <div className="form-container">
            <h2><strong>CREATE STAFF USER</strong></h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className={`form ${isSubmitting ? 'submitting' : ''}`}>
              <div className="form-group">
                <label htmlFor="userID"><strong>USER ID</strong></label>
                <input
                  type="text"
                  id="userID"
                  placeholder='Enter the user ID (e.g: STF001)'
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"><strong>PASSWORD</strong></label>
                <input
                  type="password"
                  placeholder='Enter the password'
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name"><strong>NAME</strong></label>
                <input
                  type="text"
                  id="name"
                  placeholder='Enter the name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber"><strong>PHONE NUMBER</strong></label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder='Enter the phone number'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="department"><strong>DEPARTMENT</strong></label>
                <input
                  type="text"
                  id="department"
                  placeholder='Enter the department'
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'CREATE USER'}
              </button>
            </form>
          </div>
        </div>

        {/* Internal CSS */}
        <style jsx>{`
          .admin-container {
            font-family: Arial, sans-serif;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #e9ecef;
          }

          .form-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }

          .form-container {
            max-width: 500px;
            width: 100%;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            background-color: #fff;
          }

          h2 {
            text-align: center;
            margin-bottom: 25px;
            color: #343a40;
          }

          .message {
            color: #28a745; /* Green for success */
            text-align: center;
            margin-bottom: 20px;
          }

          .form {
            display: flex;
            flex-direction: column;
          }

          .form-group {
            margin-bottom: 20px;
          }

          label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #495057;
          }

          input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ced4da;
            border-radius: 6px;
            transition: border-color 0.3s ease;
          }

          input:focus {
            border-color: #007bff;
            outline: none;
          }

          button {
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            background-color: #007bff;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }

          button:hover {
            background-color: #0056b3;
          }

          button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }

          .submitting input,
          .submitting button {
            cursor: not-allowed;
          }

          .submitting input {
            opacity: 0.6;
          }

          .submitting button {
            background-color: #6c757d;
          }
        `}</style>
      </div>
    </div>
  );
}

export default AdminStaffuploaddetails;
