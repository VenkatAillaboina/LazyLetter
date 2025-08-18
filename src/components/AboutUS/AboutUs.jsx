import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const teamMembers = [
  { name: 'Addagatla Divija', role: 'UI Designer', imgUrl: 'https://res.cloudinary.com/du8lwvfjj/image/upload/v1746095610/Addagatala_Divija_ksdy08.jpg' },
  { name: 'Ale Sanjana', role: 'Frontend Developer', imgUrl: 'https://res.cloudinary.com/du8lwvfjj/image/upload/v1746173183/Ale_Sanjana_a3ogfz.jpg' },
  { name: 'Aillaboina Venkat', role: 'React Developer & Deployment', imgUrl: 'https://res.cloudinary.com/du8lwvfjj/image/upload/v1746122234/Aillaboina_Venkat_p9ap3b.jpg' },
  { name: 'Gandu Nithin', role: 'Researcher', imgUrl: 'https://res.cloudinary.com/du8lwvfjj/image/upload/v1746122931/Gandu_Nithin_esmw0m.jpg' }
];

const projectGuide = {
  name: 'Mr. Ch. Aravind Kumar',
  role: 'Project Guide',
  affiliation: 'Asst. Professor, Vaagdevi College of Engineering',
  imgUrl: 'https://res.cloudinary.com/du8lwvfjj/image/upload/v1746095588/Chikati_Aravind_Kumar_hfnkc0.jpg'
};


function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us__container container">

        <header className="about-us__header">
          <h1 className="about-us__title">About LazyLetter</h1>
          <p className="about-us__subtitle">Streamlining Academic Correspondence</p>
        </header>

        <section className="about-us__section">
           <h2 className="about-us__section-title">What is LazyLetter?</h2>
           <p>
            LazyLetter is a web application meticulously designed to simplify and streamline the process of
            generating formal letters within educational institutions like Vaagdevi College of Engineering, Warangal.
            We understand that drafting official letters manually can be tedious, time-consuming, and prone to errors.
          </p>
          <p>
            Our platform offers a modern, intuitive, and efficient tool – the "genZ way" – providing pre-built,
            standardized templates for common letter requirements. With a strong focus on user experience and a clean interface, LazyLetter makes generating professional documents effortless.
          </p>
           <p>
            Whether it's requesting leave, generating a Bonafide Certificate, applying for an NOC, or handling other
            common institutional correspondence, LazyLetter guides you through. Select your role, pick the letter, fill the
            clear, user-friendly form, and get your professionally formatted PDF instantly.
          </p>
        </section>

         <section className="about-us__section">
           <h2 className="about-us__section-title">Why Use LazyLetter?</h2>
           <ul className="about-us__benefits-list">
             <li><strong>Time-Saving:</strong> Generate letters in seconds, not minutes.</li>
             <li><strong>Consistency:</strong> Ensures standardized formatting across all letters.</li>
             <li><strong>Accuracy:</strong> Reduces grammatical and structural errors.</li>
             <li><strong>User-Friendly:</strong> Intuitive interface designed for ease of use.</li>
             <li><strong>Privacy-Focused:</strong> Operates directly in your browser, no database integration needed for content.</li>
             <li><strong>Modern Tech:</strong> Built with React.js, jsPDF, and other robust technologies.</li>
           </ul>
         </section>

        <section className="about-us__section">
          <h2 className="about-us__section-title">Meet the Team</h2>
          <p className="about-us__section-intro">
            Developed with passion by students from Vaagdevi College of Engineering:
          </p>
          <div className="about-us__team-grid">
            {teamMembers.map((member) => (
              <div key={member.name} className="about-us__member-card">
                <div className="about-us__photo-container">
                   <img src={member.imgUrl} alt={`Photo of ${member.name}`} className="about-us__member-photo" />
                </div>
                <h3>{member.name}</h3>
                <p className="about-us__member-role">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Updated Project Guide Section --- */}
        <section className="about-us__section">
          <h2 className="about-us__section-title">Project Guide</h2>
           <div className="about-us__guide-wrapper">
              <div className="about-us__member-card">
                 <div className="about-us__photo-container">
                    <img src={projectGuide.imgUrl} alt={`Photo of ${projectGuide.name}`} className="about-us__member-photo" />
                 </div>
                <h3>{projectGuide.name}</h3>
                <p className="about-us__member-role">{projectGuide.role}</p>
                <p className="about-us__member-affiliation">{projectGuide.affiliation}</p>
                {/* --- START: Added Thank You Note --- */}
                <p className="about-us__guide-note">
                  We extend our sincere gratitude to Aravind Kumar Sir for his invaluable guidance.
                  His constant encouragement, unwavering support, and the freedom he gave us to explore and implement
                  our ideas were instrumental to this project's success. Thank you for believing in us every step of the way!
                </p>
                 {/* --- END: Added Thank You Note --- */}
              </div>
           </div>
        </section>
        {/* --- End Updated Section --- */}

        <div className="about-us__back-link-container">
          <Link to="/" className="button button--primary about-us__back-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16" style={{ verticalAlign: 'middle' }}>
              <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
            </svg>
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default AboutUs;