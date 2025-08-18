import React from 'react';
import { Link } from 'react-router-dom';
import '../LetterSelection.css'; // Import the common CSS

function FacultyLetterSelection() {
  const letters = [
    { type: 'leave', label: 'Leave Application' },
    { type: 'noc', label: 'No Objection Certificate' },
    { type: 'promotion', label: 'Promotion Request' },
    { type: 'equipment', label: 'Equipment Request' },
    { type: 'resignation', label: 'Resignation Letter' },
  ];

  return (
    <div className="letter-selection">
      <h2 className="letter-selection__title">Select Faculty Letter Type</h2>
      <div className="letter-selection__options">
        {letters.map((letter) => (
          <Link
            key={letter.type}
            to={`/faculty-letter/${letter.type}`}
            className="letter-selection__option-link"
          >
            {letter.label}
          </Link>
        ))}
      </div>
      <div className="letter-selection__back-link-container">
        <Link to="/" className="button button--secondary letter-selection__back-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default FacultyLetterSelection;