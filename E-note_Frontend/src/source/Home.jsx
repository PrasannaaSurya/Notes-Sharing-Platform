import React, { useEffect, useState } from 'react';
import './Home.css';
import './Page.css';
import Navbars from './Navbars';
import yourImage from './2672292.jpg'; // Update the path based on your folder structure
import CustomModal from './CustomModal'; // Import the new modal component

const features = [
  {
    title: "Share Your Notes with Ease",
    image: "https://images.unsplash.com/photo-1470549638415-0a0755be0619?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2t8ZW58MHx8MHx8fDA%3D",
    desc: "Our platform allows users to upload and share notes on various computer subjects effortlessly."
  },
  {
    title: "Download Quality Study Materials",
    image: "https://images.unsplash.com/photo-1500160503851-c04cefe545a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN0dWRlbnQlMjB3aXRoJTIwc3R1ZHklMjBtYXRlcmlhbHN8ZW58MHx8MHx8fDA%3D",
    desc: "Access a diverse range of notes shared by other users to enhance your learning experience."
  },
  {
    title: "User-Friendly Interface",
    image: "https://img.freepik.com/free-vector/mobile-ux-concept-illustration_114360-4430.jpg?size=626&ext=jpg",
    desc: "Our intuitive design ensures that finding and sharing notes is quick and hassle-free."
  }
];

const Card = ({ title, image, desc }) => (
  <div className="card">
    <img className="photo" src={image} alt={title} />
    <div className="content">
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  </div>
);

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbars />

      <div className="main-container">
        <section className="search-section">
          <Page setIsModalOpen={setIsModalOpen} />
        </section>

        <div className="features-section">
          <h2 className="feature-notes-header">Feature Notes</h2>
          <div className="features">
            {features.map((feat, index) => (
              <Card key={index} {...feat} />
            ))}
          </div>
        </div>

        <section className="about-section">
          <AboutUs />
        </section>

        {/* Footer */}
        <footer>
          <div className="footerContainer">
            <div className="socialIcons">
              <a href="www.facebook.com" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="www.instagram.com" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="www.twitter.com" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
              <a href="www.youtube.com" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>
          <div className="footerBottom">
            <p>Copyright &copy;2023; Designed by <span className="designer">SP</span></p>
          </div>
        </footer>

        {/* Modal */}
        {isModalOpen && <CustomModal closeModal={closeModal} />}
      </div>
    </div>
  );
};

const Page = ({ setIsModalOpen }) => {
  return (
    <div className="page">
      <SearchBar setIsModalOpen={setIsModalOpen} />
    </div>
  );
}


const SearchBar = ({ setIsModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:6900/api/files/all');
        const data = await response.json();
        setFiles(data); // Assuming data is an array of files
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFiles();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter files based on search term
    if (value) {
      const filtered = files.filter(file =>
        file.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFiles(filtered);
    } else {
      setFilteredFiles([]);
    }
  };

  const handleFileClick = () => {
    setIsModalOpen(true); // Open modal on file click
  };

  return (
    <div className="homepage">
      <header className="hero-section">
        <h1>Grow smarter together</h1>
        <p>Find top-rated study notes from students taking the same courses as you.</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for courses, books or documents"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          {/* Display search results */}
          {searchTerm && filteredFiles.length > 0 && (
            <div className="search-results" style={{ display: 'block' }}>
              <ul>
                {filteredFiles.map((file) => (
                  <li key={file.id} onClick={handleFileClick}>{file.description}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}


const AboutUs = () => {
  const handleContactClick = () => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=example@gmail.com", "_blank");
  };

  return (
    <section className="about-us">
      <div className="image-container">
        <img src={yourImage} alt="About Us" className="about-image" />
      </div>
      <div className="text-content">
        <h1>About Us</h1>
        <p>
          Welcome to NoteShare, your go-to platform for sharing and discovering notes. Whether you’re a student, professional, or lifelong learner, NoteShare is designed to help you organize, share, and access valuable information effortlessly.<br /><br />
          At NoteShare, we believe in the power of collaboration and knowledge sharing. Our mission is to create a community where users can contribute their insights, learn from others, and stay ahead in their fields. With our user-friendly interface and robust features, you can easily upload your notes, categorize them, and share them with a global audience. Join us on this journey to make learning more accessible and enjoyable for everyone. Together, we can build a repository of knowledge that benefits all.
        </p>
        <div className="button-container">
          <button className="contact-button" onClick={handleContactClick}>
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
