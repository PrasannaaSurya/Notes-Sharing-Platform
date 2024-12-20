import './App.css';
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './source/Home';
import Adminhomepage from './source/Adminhomepage';
import Studentdetails from './source/Studentdetails';
import AdminStaffuploaddetails from './source/AdminStaffuploaddetails';
import AdminStaffdetails from './source/AdminStaffdetails';
import Studenthomepage from './source/Studenthomepage';
import StaffHomepage from './source/StaffHomepage';
import Booksnotesdetails from './source/Booksnotesdetails';
import Uploadpdf from './source/Uploadpdf';
import Downloadfiles from './source/Downloadfiles';
import Announcements from './source/Announcements';
import StudentAnnouncement from './source/StudentAnnouncement';
import Staffstudentdetails from './source/Staffstudentdetails';
import Staffuploadbooks from './source/Staffuploadbooks';
import Managebooks from './source/Managebooks';
import Staffannouncement1 from './source/Staffannouncement1';
import StudentProfile from './source/StudentProfile';
import StaffProfile from './source/StaffProfile';

function App() {
  return (
   <div>
   <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="adminhomepage" element={<Adminhomepage/>} />
        <Route path="studentdetails" element={<Studentdetails/>} />
        <Route path="adminstaffuploaddetails" element={<AdminStaffuploaddetails/>} />
        <Route path="adminstaffdetails" element={<AdminStaffdetails/>} />
        <Route path="studenthomepage" element={<Studenthomepage/>} />
        <Route path="staffhomepage" element={<StaffHomepage/>} />
        <Route path="booksnotesdetails" element={<Booksnotesdetails/>} />
        <Route path="uploadpdf" element={<Uploadpdf/>} />
        <Route path="downloadfiles" element={<Downloadfiles/>} />
        <Route path="announcements" element={<Announcements/>} />
        <Route path="announcements1" element={<StudentAnnouncement/>} />
        <Route path="staffstudentdetails" element={<Staffstudentdetails/>} />
        <Route path="staffupload" element={<Staffuploadbooks/>} />
        <Route path="managebooks" element={<Managebooks/>} />
        <Route path="staffannouncement" element={<Staffannouncement1/>} />
        <Route path="studentprofile" element={<StudentProfile/>} />
        <Route path="staffprofile" element={<StaffProfile/>} />
    </Routes>

   </div>
  );
}

export default App;
