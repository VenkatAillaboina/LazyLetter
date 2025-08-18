import React from 'react';
import { Link } from 'react-router-dom';
import '../LetterSelection.css'; // Import the common CSS

function HODLetterSelection() {
  const letters = [
    { type: 'permission', label: 'Permission Letter' },
    // Add other HOD letter types here
  ];

  return (
    <div className="letter-selection">
      <h2 className="letter-selection__title">Select HOD Letter Type</h2>
      <div className="letter-selection__options">
        {letters.map((letter) => (
          <Link
            key={letter.type}
            to={`/hod-letter/${letter.type}`}
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

export default HODLetterSelection;