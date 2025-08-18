import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUS/AboutUs';
import StudentLetterForm from './components/Student/StudentLetterForm';
import FacultyLetterForm from './components/Faculty/FacultyLetterForm';
import HODLetterForm from './components/HOD/HODLetterForm';
import LetterDownload from './components/LetterDownload/LetterDownload';
import StudentLetterSelection from './components/Student/StudentLetterSelection';
import FacultyLetterSelection from './components/Faculty/FacultyLetterSelection';
import HODLetterSelection from './components/HOD/HODLetterSelection';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/student-letters" element={<StudentLetterSelection />} />
        <Route path="/faculty-letters" element={<FacultyLetterSelection />} />
        <Route path="/hod-letters" element={<HODLetterSelection />} />
        <Route path="/student-letter/:type" element={<StudentLetterForm />} />
        <Route path="/faculty-letter/:type" element={<FacultyLetterForm />} />
        <Route path="/hod-letter/:type" element={<HODLetterForm />} />
        <Route path="/download" element={<LetterDownload />} />
      </Routes>
    </div>
  );
}

export default App;