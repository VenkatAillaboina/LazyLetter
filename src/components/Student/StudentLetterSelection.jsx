import React from 'react';
import { Link } from 'react-router-dom';
import '../LetterSelection.css'; // Import the common CSS

function StudentLetterSelection() {
  const letters = [
    { type: 'leave', label: 'Leave Application' },
    { type: 'bonafide', label: 'Bonafide Certificate' },
    { type: 'idcard', label: 'ID Card Request' },
    { type: 'delayfee', label: 'Delay Fee Payment Request' },
    { type: 'eventattendance', label: 'Event Attendance Request' },
  ];

  return (
    <div className="letter-selection">
      <h2 className="letter-selection__title">Select Student Letter Type</h2>
      <div className="letter-selection__options">
        {letters.map((letter) => (
          <Link
            key={letter.type}
            to={`/student-letter/${letter.type}`}
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

export default StudentLetterSelection;