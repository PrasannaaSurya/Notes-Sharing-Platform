import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StudentNavbar from './StudentNavbar';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #e2e2e2, #f4f4f4);
  min-height: 100vh;
  padding: 20px;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

const WelcomeTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
`;

const RegisterNumber = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Card = styled.div`
  flex: 1 1 300px;
  margin: 15px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 1s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    animation: ${pulse} 1s ease-in-out;
  }
`;

const Icon = styled.i`
  font-size: 48px;
  background: linear-gradient(45deg, #3498db, #8e44ad);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 15px;
`;

const CardTitle = styled.h2`
  font-size: 22px;
  margin: 10px 0;
  color: #333;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #777;
`;
const UploadLink = styled.a`
  display: inline-block;
  margin-top: 15px;
  padding: 12px 24px;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(90deg, #333, #555);
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #e74c3c, #3498db);
    color: #fff;
  }
`;

function StudentHomepage() {
  const location = useLocation();
  const registerNumber = location.state?.registerNumber;

  useEffect(() => {
    if (registerNumber) {
      sessionStorage.setItem('registerNumber', registerNumber);
    }
  }, [registerNumber]);

  return (
    <div>
      <StudentNavbar /><br /><br /><br />
      <Container>
        <Content>
          <WelcomeTitle><strong>WELCOME TO STUDENT DASHBOARD</strong></WelcomeTitle>
          {registerNumber && <RegisterNumber><strong>REGISTER NUMBER</strong>: {registerNumber}</RegisterNumber>}
          <Actions>
            <Card>
              <Icon className="fas fa-upload" />
              <CardTitle><strong>UPLOAD FILES</strong></CardTitle>
              <CardDescription>Easily upload books, notes, PDFs, and more.</CardDescription>
              <UploadLink href="/uploadpdf"><strong>UPLOAD NOW</strong></UploadLink>
            </Card>
            <Card>
              <Icon className="fas fa-download" />
              <CardTitle><strong>DOWNLOAD FILES</strong></CardTitle>
              <CardDescription>Access and download the files you need.</CardDescription>
              <UploadLink href="/downloadfiles"><strong>DOWNLOAD NOW</strong></UploadLink>
            </Card>
            <Card>
              <Icon className="fas fa-bullhorn" />
              <CardTitle><strong>ANNOUNCEMENT</strong></CardTitle>
              <CardDescription>Stay updated with the latest announcements.</CardDescription>
              <UploadLink href="/announcements1"><strong>VIEW ANNOUNCEMENTS</strong></UploadLink>
            </Card>
          </Actions>
        </Content>
      </Container>
    </div>
  );
}

export default StudentHomepage;