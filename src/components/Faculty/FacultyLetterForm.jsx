import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import InputField from '../Common/InputField';
import '../LetterForm.css'; // Import the common CSS

function FacultyLetterForm() {
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
    facultyName: '',
    designation: '',
    departmentName: '',
    collegeName: '',
    contactInformation: '',
    startDate: getFormattedDate(),
    endDate: getFormattedDate(),
    reason: '',
    purpose: '',
    currentDesignation: '',
    desiredDesignation: '',
    yearsOfService: '',
    keyAchievements: '',
    labName: '',
    equipmentList: '',
    lastWorkingDate: getFormattedDate(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     const fieldLabels = {
      facultyName: 'Faculty Name', designation: 'Designation', departmentName: 'Department Name', collegeName: 'College Name', contactInformation: 'Contact Information', startDate: 'Start Date', endDate: 'End Date', reason: 'Reason', purpose: 'Purpose', currentDesignation: 'Current Designation', desiredDesignation: 'Desired Designation', yearsOfService: 'Years of Service', keyAchievements: 'Key Achievements', labName: 'Lab Name', equipmentList: 'Equipment List', lastWorkingDate: 'Last Working Date',
    };
    const commonRequiredFields = ['facultyName', 'designation', 'departmentName', 'collegeName', 'contactInformation'];
    let typeSpecificRequiredFields = [];

     switch (type) {
      case 'leave': typeSpecificRequiredFields = ['startDate', 'endDate', 'reason']; break;
      case 'noc': typeSpecificRequiredFields = ['purpose']; break;
      case 'promotion': typeSpecificRequiredFields = ['currentDesignation', 'desiredDesignation', 'yearsOfService', 'keyAchievements']; break;
      case 'equipment': typeSpecificRequiredFields = ['labName', 'equipmentList']; break;
      case 'resignation': typeSpecificRequiredFields = ['lastWorkingDate', 'reason']; break;
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
    navigate('/download', { state: { formData, letterType: type, userType: 'faculty' } });
  };

  // Helper to add span attribute for specific fields
  const getFieldProps = (fieldName) => {
    const wideFields = ['reason', 'purpose', 'keyAchievements', 'equipmentList'];
    return wideFields.includes(fieldName) ? { 'data-field-span': '2' } : {};
  };

  return (
    <div className="letter-form">
      <h2 className="letter-form__title">Faculty Letter: {type.replace(/([A-Z])/g, ' $1')}</h2>
      <form onSubmit={handleSubmit} className="letter-form__form">
        <InputField label="Date" name="date" value={formData.date} onChange={handleChange} type="date" />
        <InputField label="Faculty Name" name="facultyName" value={formData.facultyName} onChange={handleChange} />
        <InputField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
        <InputField label="Department Name" name="departmentName" value={formData.departmentName} onChange={handleChange} />
        <InputField label="College Name" name="collegeName" value={formData.collegeName} onChange={handleChange} />
        <InputField label="Contact Information" name="contactInformation" value={formData.contactInformation} onChange={handleChange} {...getFieldProps('contactInformation')} />

        {type === 'leave' && (
          <>
            <InputField label="Start Date" name="startDate" value={formData.startDate} onChange={handleChange} type="date" />
            <InputField label="End Date" name="endDate" value={formData.endDate} onChange={handleChange} type="date" />
            <InputField label="Reason" name="reason" value={formData.reason} onChange={handleChange} {...getFieldProps('reason')} />
          </>
        )}
        {type === 'noc' && (
          <InputField label="Purpose" name="purpose" value={formData.purpose} onChange={handleChange} {...getFieldProps('purpose')} />
        )}
        {type === 'promotion' && (
          <>
            <InputField label="Current Designation" name="currentDesignation" value={formData.currentDesignation} onChange={handleChange} />
            <InputField label="Desired Designation" name="desiredDesignation" value={formData.desiredDesignation} onChange={handleChange} />
            <InputField label="Years of Service" name="yearsOfService" value={formData.yearsOfService} onChange={handleChange} type="number"/>
            <InputField label="Key Achievements" name="keyAchievements" value={formData.keyAchievements} onChange={handleChange} {...getFieldProps('keyAchievements')} />
          </>
        )}
        {type === 'equipment' && (
          <>
            <InputField label="Lab Name" name="labName" value={formData.labName} onChange={handleChange} />
            <InputField label="Equipment List (comma separated)" name="equipmentList" value={formData.equipmentList} onChange={handleChange} {...getFieldProps('equipmentList')} />
          </>
        )}
        {type === 'resignation' && (
          <>
            <InputField label="Last Working Date" name="lastWorkingDate" value={formData.lastWorkingDate} onChange={handleChange} type="date" />
            <InputField label="Reason" name="reason" value={formData.reason} onChange={handleChange} {...getFieldProps('reason')} />
          </>
        )}

        <div className="letter-form__actions">
          <button type="submit" className="button button--primary letter-form__submit-button">
            Generate Letter
          </button>
          <Link to="/faculty-letters" className="button button--secondary letter-form__back-link">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default FacultyLetterForm;