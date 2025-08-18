import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import InputField from '../Common/InputField';
import '../LetterForm.css'; // Import the common CSS

function StudentLetterForm() {
  const { type } = useParams();
  const navigate = useNavigate();

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    date: getFormattedDate(),
    studentName: '',
    classYear: '',
    departmentName: '',
    collegeName: '',
    rollNumber: '',
    contactInformation: '',
    startDate: getFormattedDate(),
    endDate: getFormattedDate(),
    reason: '',
    purpose: '',
    courseName: '',
    dueDate: getFormattedDate(),
    proposedDate: getFormattedDate(),
    eventName: '',
    organizingBody: '',
    eventDate: getFormattedDate(),
    participants: '',
    representativeStudentName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldLabels = {
      studentName: 'Student Name', classYear: 'Class/Year', departmentName: 'Department Name', collegeName: 'College Name', rollNumber: 'Roll Number', contactInformation: 'Contact Information', startDate: 'Start Date', endDate: 'End Date', reason: 'Reason', purpose: 'Purpose', courseName: 'Course Name', dueDate: 'Due Date', proposedDate: 'Proposed Date', eventName: 'Event Name', organizingBody: 'Organizing Body', eventDate: 'Event Date', participants: 'Participants', representativeStudentName: 'Representative Student Name',
    };
    const commonRequiredFields = ['studentName', 'classYear', 'departmentName', 'collegeName', 'rollNumber', 'contactInformation'];
    let typeSpecificRequiredFields = [];

    switch (type) {
      case 'leave': typeSpecificRequiredFields = ['startDate', 'endDate', 'reason']; break;
      case 'bonafide': typeSpecificRequiredFields = ['purpose']; break;
      case 'idcard': break;
      case 'delayfee': typeSpecificRequiredFields = ['courseName', 'dueDate', 'proposedDate', 'reason']; break;
      case 'eventattendance': typeSpecificRequiredFields = ['eventName', 'organizingBody', 'eventDate', 'participants', 'representativeStudentName']; break;
      default: break;
    }

    const allRequiredFields = [...commonRequiredFields, ...typeSpecificRequiredFields];
    for (const field of allRequiredFields) {
      if (!formData[field] || String(formData[field]).trim() === '') { // Ensure value is treated as string for trim
        const friendlyName = fieldLabels[field] || field;
        alert(`Please fill out the "${friendlyName}" field.`);
        return;
      }
    }
    navigate('/download', { state: { formData, letterType: type, userType: 'student' } });
  };

   // Helper to add span attribute for specific fields
   const getFieldProps = (fieldName) => {
    const wideFields = ['reason', 'purpose', 'participants'];
    return wideFields.includes(fieldName) ? { 'data-field-span': '2' } : {};
  };

  return (
    <div className="letter-form">
      <h2 className="letter-form__title">Student Letter: {type.replace(/([A-Z])/g, ' $1')}</h2>
      <form onSubmit={handleSubmit} className="letter-form__form">
        <InputField label="Date" name="date" value={formData.date} onChange={handleChange} type="date" />
        <InputField label="Student Name" name="studentName" value={formData.studentName} onChange={handleChange} />
        <InputField label="Class/Year" name="classYear" value={formData.classYear} onChange={handleChange} />
        <InputField label="Department Name" name="departmentName" value={formData.departmentName} onChange={handleChange} />
        <InputField label="College Name" name="collegeName" value={formData.collegeName} onChange={handleChange} />
        <InputField label="Roll Number" name="rollNumber" value={formData.rollNumber} onChange={handleChange} />
        <InputField label="Contact Information" name="contactInformation" value={formData.contactInformation} onChange={handleChange} {...getFieldProps('contactInformation')} />

        {type === 'leave' && (
          <>
            <InputField label="Start Date" name="startDate" value={formData.startDate} onChange={handleChange} type="date" />
            <InputField label="End Date" name="endDate" value={formData.endDate} onChange={handleChange} type="date" />
            <InputField label="Reason" name="reason" value={formData.reason} onChange={handleChange} {...getFieldProps('reason')} />
          </>
        )}
        {type === 'bonafide' && (
          <InputField label="Purpose" name="purpose" value={formData.purpose} onChange={handleChange} {...getFieldProps('purpose')} />
        )}
         {type === 'delayfee' && (
          <>
            <InputField label="Course Name" name="courseName" value={formData.courseName} onChange={handleChange} />
            <InputField label="Due Date" name="dueDate" value={formData.dueDate} onChange={handleChange} type="date" />
            <InputField label="Proposed Date" name="proposedDate" value={formData.proposedDate} onChange={handleChange} type="date" />
            <InputField label="Reason" name="reason" value={formData.reason} onChange={handleChange} {...getFieldProps('reason')} />
          </>
        )}
         {type === 'eventattendance' && (
          <>
            <InputField label="Event Name" name="eventName" value={formData.eventName} onChange={handleChange} />
            <InputField label="Organizing Body" name="organizingBody" value={formData.organizingBody} onChange={handleChange} />
            <InputField label="Event Date" name="eventDate" value={formData.eventDate} onChange={handleChange} type="date" />
            <InputField label="Representative Student Name" name="representativeStudentName" value={formData.representativeStudentName} onChange={handleChange} />
            <InputField label="Participants (Names/Roll Nos)" name="participants" value={formData.participants} onChange={handleChange} {...getFieldProps('participants')} />
          </>
        )}

        <div className="letter-form__actions">
           <button type="submit" className="button button--primary letter-form__submit-button">
             Generate Letter
           </button>
           <Link to="/student-letters" className="button button--secondary letter-form__back-link">
             Cancel
           </Link>
        </div>
      </form>
    </div>
  );
}

export default StudentLetterForm;