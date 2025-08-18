import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1 className="home__title">LazyLetter</h1>
      <p className="home__subtitle">- Do it genZ way</p>
      <div className="home__roles">
        <Link to="/student-letters" className="button button--secondary home__role-button">
          Student
        </Link>
        <Link to="/faculty-letters" className="button button--secondary home__role-button">
          Faculty
        </Link>
        <Link to="/hod-letters" className="button button--secondary home__role-button">
          HOD
        </Link>
      </div>
      <Link to="/about" className="button button--tertiary home__about-button">
        About Us
      </Link>
    </div>
  );
}

export default Home;