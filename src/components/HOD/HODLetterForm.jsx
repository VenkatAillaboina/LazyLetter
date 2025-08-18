import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import InputField from '../Common/InputField';
import '../LetterForm.css'; // Import the common CSS

function HODLetterForm() {
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
    hodName: '',
    departmentName: '',
    collegeName: '',
    contactInformation: '',
    startDate: getFormattedDate(),
    endDate: getFormattedDate(),
    permissionFor: '',
    permissionDetails: '',
    recipientName: '',
    recipientDesignation: '',
    recipientDepartment: '',
    recipientCollege: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     const fieldLabels = {
      hodName: 'HOD Name', departmentName: 'Department Name', collegeName: 'College Name', contactInformation: 'Contact Information', permissionFor: 'Permission For', permissionDetails: 'Permission Details', recipientName: 'Recipient Name', recipientDesignation: 'Recipient Designation', recipientDepartment: 'Recipient Department', recipientCollege: 'Recipient College',
    };
     const commonRequiredFields = ['hodName', 'departmentName', 'collegeName', 'contactInformation'];
    let typeSpecificRequiredFields = [];

     switch (type) {
      case 'permission':
        typeSpecificRequiredFields = [ 'permissionFor', 'permissionDetails', 'recipientName', 'recipientDesignation', 'recipientDepartment', 'recipientCollege'];
        break;
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
    navigate('/download', { state: { formData, letterType: type, userType: 'hod' } });
  };

  // Helper to add span attribute for specific fields
  const getFieldProps = (fieldName) => {
    const wideFields = ['permissionDetails'];
    return wideFields.includes(fieldName) ? { 'data-field-span': '2' } : {};
  };


  return (
    <div className="letter-form">
      <h2 className="letter-form__title">HOD Letter: {type.replace(/([A-Z])/g, ' $1')}</h2>
      <form onSubmit={handleSubmit} className="letter-form__form">
        <InputField label="Date" name="date" value={formData.date} onChange={handleChange} type="date" />
        <InputField label="HOD Name" name="hodName" value={formData.hodName} onChange={handleChange} />
        <InputField label="Department Name" name="departmentName" value={formData.departmentName} onChange={handleChange} />
        <InputField label="College Name" name="collegeName" value={formData.collegeName} onChange={handleChange} />
        <InputField label="Contact Information" name="contactInformation" value={formData.contactInformation} onChange={handleChange} {...getFieldProps('contactInformation')} />

        {type === 'permission' && (
          <>
            <InputField label="Permission For (e.g., Event, Workshop)" name="permissionFor" value={formData.permissionFor} onChange={handleChange} {...getFieldProps('permissionFor')}/>
            <InputField label="Recipient Name" name="recipientName" value={formData.recipientName} onChange={handleChange} />
            <InputField label="Recipient Designation" name="recipientDesignation" value={formData.recipientDesignation} onChange={handleChange} />
            <InputField label="Recipient Department" name="recipientDepartment" value={formData.recipientDepartment} onChange={handleChange} />
            <InputField label="Recipient College/Organization" name="recipientCollege" value={formData.recipientCollege} onChange={handleChange} />
            <InputField label="Permission Details" name="permissionDetails" value={formData.permissionDetails} onChange={handleChange} {...getFieldProps('permissionDetails')}/>
         </>
        )}

         <div className="letter-form__actions">
           <button type="submit" className="button button--primary letter-form__submit-button">
             Generate Letter
           </button>
           <Link to="/hod-letters" className="button button--secondary letter-form__back-link">
             Cancel
           </Link>
         </div>
      </form>
    </div>
  );
}

export default HODLetterForm;