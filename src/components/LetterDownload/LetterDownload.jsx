import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import './LetterDownload.css'; // Import the CSS

function LetterDownload() {
  const location = useLocation();
  // Use optional chaining and nullish coalescing for safer access
  const { formData, letterType, userType } = location.state ?? {};
  const effectRan = useRef(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'generating', 'ready', 'error'
  const [error, setError] = useState(null);
  const [pdfDataUri, setPdfDataUri] = useState(null); // Store generated PDF data URI
  const [pdfFileName, setPdfFileName] = useState(''); // Store the suggested filename

  // --- Letter Generation Functions (Keep these exactly as they were) ---
  const generateStudentLeaveLetter = (data) => {
    // ... (original function content)
    return `Date: ${data.date}

From:
${data.studentName},
${data.classYear},
${data.departmentName},
${data.collegeName}

To:
The Head of Department,
${data.departmentName},
${data.collegeName}

Subject: Application for Leave

Respected Sir/Madam,

I am writing to request a leave of absence from ${data.startDate} to ${data.endDate}, as I am unable to attend classes due to ${data.reason}.

Yours sincerely,
${data.studentName}
${data.rollNumber}
${data.contactInformation}
    `;
  };

  const generateStudentBonafideLetter = (data) => {
    // ... (original function content)
     return `Date: ${data.date}

From:
${data.studentName},
${data.classYear},
${data.departmentName},
${data.collegeName}

To:
The Head of Department,
${data.departmentName},
${data.collegeName}

Subject: Application for Bonafide Certificate

Respected Sir/Madam,

I am writing to request a Bonafide Certificate for ${data.purpose}.

Yours sincerely,
${data.studentName}
${data.rollNumber}
${data.contactInformation}
    `;
  };

  const generateStudentIdCardLetter = (data) => {
    // ... (original function content)
     return `Date: ${data.date}

From:
${data.studentName},
${data.classYear},
${data.departmentName},
${data.collegeName}

To:
The Head of Department,
${data.departmentName},
${data.collegeName}

Subject: Request for Permission to Take the Exam Without ID Card

Respected Sir/Madam,

I have an exam today, but I forgot my ID card. I kindly request your permission to appear for the exam. I assure you that this was an unintentional mistake, and I will be careful in the future. I would be grateful for your approval.

Yours sincerely,
${data.studentName}
${data.rollNumber}
${data.contactInformation}
    `;
  };

  const generateStudentDelayFeeLetter = (data) => {
    // ... (original function content)
    return `Date: ${data.date}

From:
${data.studentName},
${data.classYear},
${data.departmentName},
${data.collegeName}

To:
The Principal,
${data.collegeName}

Subject: Request for Permission to Pay Fees After the Due Date

Respected Sir/Madam,

I, ${data.studentName}, am a student of ${data.courseName}, ${data.classYear} in the Department of ${data.departmentName} at ${data.collegeName}. Due to ${data.reason}, I am unable to pay the semester fees by the designated due date of ${data.dueDate}. I kindly request your permission to pay the fees by ${data.proposedDate}. I sincerely apologize for the inconvenience caused and assure you that the payment will be made by the mentioned date. Thank you for your consideration.

Yours sincerely,
${data.studentName}
${data.rollNumber}
${data.contactInformation}
    `;
  };

  const generateStudentEventAttendanceLetter = (data) => {
    // ... (original function content)
    return `Date: ${data.date}

From:
${data.classYear},
${data.departmentName},
${data.collegeName}

To:
The Head of Department,
${data.departmentName},
${data.collegeName}

Subject: Request for Attendance for Participation in ${data.eventName}

Respected Sir/Madam,

We, the students of ${data.classYear} from the Department of ${data.departmentName}, participated in ${data.eventName}, organized by ${data.organizingBody} on ${data.eventDate}. We request your kind approval to provide attendance for the mentioned date since our participation was officially sanctioned and we actively represented the college at this event. The following students participated in the event:

${data.participants}

We kindly request you to consider this and mark us present for the respective event days. Your support in this matter is greatly appreciated. Thank you for your understanding and cooperation.

Yours sincerely,
${data.representativeStudentName}
${data.rollNumber}
${data.contactInformation}
    `;
  };

  const generateFacultyLeaveLetter = (data) => {
    // ... (original function content)
    return `Date: ${data.date}

From:
${data.facultyName},
${data.designation},
${data.departmentName},
${data.collegeName}

To:
The Head of Department,
${data.departmentName},
${data.collegeName}

Subject: Application for Leave

Respected Sir/Madam,

I am writing to request leave from ${data.startDate} to ${data.endDate} due to ${data.reason}. I kindly request your approval for this leave of absence. I will ensure to complete any pending work once I resume. Thank you for your understanding and consideration.

Yours sincerely,
${data.facultyName}
${data.designation}
${data.contactInformation}
    `;
  };

  const generateFacultyNOCLetter = (data) => {
    // ... (original function content)
    return `Date: ${data.date}

From:
${data.facultyName},
${data.designation},
${data.departmentName},
${data.collegeName}

To:
The Head of Department,
${data.departmentName},
${data.collegeName}

Subject: Request for No Objection Certificate (NOC)

Respected Sir/Madam,

I, ${data.facultyName}, working as ${data.designation} in the Department of ${data.departmentName}, am writing to request a No Objection Certificate (NOC) to ${data.purpose}. I assure you that this opportunity will not interfere with my duties and responsibilities at the university/college, and I will continue to fulfill my academic and administrative obligations without any hindrance. I kindly request you to issue the NOC at your earliest convenience. Your support in this matter will be greatly appreciated. Thank you for your consideration.

Yours sincerely,
${data.facultyName}
${data.designation}
${data.contactInformation}
    `;
  };

  const generateFacultyPromotionLetter = (data) => {
    // ... (original function content)
    return `Date: ${data.date}

From:
${data.facultyName},
${data.currentDesignation},
${data.departmentName},
${data.collegeName}

To:
The Head of Department,
${data.departmentName},
${data.collegeName}

Subject: Request for Promotion

Respected Sir/Madam,

I, ${data.facultyName}, currently serving as ${data.currentDesignation} in the Department of ${data.departmentName}, am writing to formally request a promotion to the position of ${data.desiredDesignation}. Over the past ${data.yearsOfService}, I have diligently fulfilled my responsibilities, contributing to the academic progress of the department through ${data.keyAchievements}. I believe my performance and commitment align with the criteria for promotion. I kindly request you to consider my application for promotion, and I am happy to provide any additional information or documentation if required. I look forward to your favorable consideration. Thank you for your time and support.

Yours sincerely,
${data.facultyName}
${data.currentDesignation}
${data.contactInformation}
    `;
  };

  const generateFacultyEquipmentLetter = (data) => {
    // ... (original function content)
    return `Date: ${data.date}

From:
${data.facultyName},
${data.designation},
${data.departmentName},
${data.collegeName}

To:
The Head of Department,
${data.departmentName},
${data.collegeName}

Subject: Request for New Equipment/Resources for ${data.labName}

Respected Sir/Madam,

I, ${data.facultyName}, working as ${data.designation} in the Department of ${data.departmentName}, am writing to request the provision of new equipment/resources for the ${data.labName}. Currently, the lab requires the following items to support ongoing academic and research activities:

${data.equipmentList}

These resources are essential for the smooth functioning of practical sessions and for the benefit of students and faculty engaged in research and lab-based activities. We would greatly appreciate your approval for the procurement of the necessary items. Thank you for your attention and consideration.

Yours sincerely,
${data.facultyName}
${data.designation}
${data.contactInformation}
    `;
  };

  const generateFacultyResignationLetter = (data) => {
    // ... (original function content)
     return `Date: ${data.date}

From:
${data.facultyName},
${data.designation}, // Changed from currentDesignation based on original form state
${data.departmentName},
${data.collegeName}

To:
The Head of Department,
${data.departmentName},
${data.collegeName}

Subject: Resignation from the Post of ${data.designation} // Changed from currentDesignation

Respected Sir/Madam,

I, ${data.facultyName}, currently serving as ${data.designation} in the Department of ${data.departmentName}, hereby submit my formal resignation from my position, effective from ${data.lastWorkingDate}. After much consideration, I have decided to pursue ${data.reason}. I appreciate the opportunities I have had to grow professionally during my tenure here and will always be grateful for the support and guidance I received from you and my colleagues. I assure you that I will complete any pending work and ensure a smooth transition of my responsibilities during the notice period. Thank you once again for the valuable experiences, and I look forward to staying in touch.

Yours sincerely,
${data.facultyName}
${data.designation} // Changed from currentDesignation
${data.contactInformation}
    `;
  };

  const generateHODPermissionLetter = (data) => {
    // ... (original function content)
    // Using original HOD letter structure
    return `Date: ${data.date}

From:
${data.hodName},
Head of Department,
${data.departmentName},
${data.collegeName}

To:
${data.recipientName}, // Adjusted to use specific recipient fields from form
${data.recipientDesignation},
${data.recipientDepartment},
${data.recipientCollege}

Subject: Permission for ${data.permissionFor}

Respected Sir/Madam,

This is to grant permission for ${data.permissionDetails}.

Sincerely,
${data.hodName}
Head of Department
${data.contactInformation}
    `;
  };
  // --- End Letter Generation Functions ---

  // --- Generate PDF Function (modified to return data URI) ---
  const generatePDFData = useCallback((data, type, userType) => {
    return new Promise((resolve, reject) => {
      try {
        const doc = new jsPDF('p', 'mm', 'a4');
        const margin = 20;
        let y = margin;
        const lineHeight = 7; // Line height in mm
        let letterContent = '';
        let filename = `LazyLetter-${userType}-${type}.pdf`; // Default filename

        // Select the correct generator function
        if (userType === 'student') {
            switch (type) {
                case 'leave': letterContent = generateStudentLeaveLetter(data); break;
                case 'bonafide': letterContent = generateStudentBonafideLetter(data); break;
                case 'idcard': letterContent = generateStudentIdCardLetter(data); break;
                case 'delayfee': letterContent = generateStudentDelayFeeLetter(data); break;
                case 'eventattendance': letterContent = generateStudentEventAttendanceLetter(data); break;
                default: throw new Error(`Unknown student letter type: ${type}`);
            }
        } else if (userType === 'faculty') {
            switch (type) {
                case 'leave': letterContent = generateFacultyLeaveLetter(data); break;
                case 'noc': letterContent = generateFacultyNOCLetter(data); break;
                case 'promotion': letterContent = generateFacultyPromotionLetter(data); break;
                case 'equipment': letterContent = generateFacultyEquipmentLetter(data); break;
                case 'resignation': letterContent = generateFacultyResignationLetter(data); break;
                default: throw new Error(`Unknown faculty letter type: ${type}`);
            }
        } else if (userType === 'hod') {
             switch (type) {
                 case 'permission': letterContent = generateHODPermissionLetter(data); break;
                 default: throw new Error(`Unknown HOD letter type: ${type}`);
             }
        } else {
            throw new Error(`Unknown user type: ${userType}`);
        }

        // Add content to PDF
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        const splitText = doc.splitTextToSize(letterContent, doc.internal.pageSize.width - 2 * margin);

        splitText.forEach(line => {
          if (y + lineHeight > doc.internal.pageSize.height - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += lineHeight;
        });

        // Output as data URI instead of saving directly
        const dataUri = doc.output('datauristring');
        resolve({ dataUri, filename });

      } catch (err) {
        console.error("Error during PDF generation:", err);
        reject(err); // Reject the promise on error
      }
    });
  }, []); // Empty dependency array means this function is stable

  // --- Effect to Generate PDF on Mount ---
  useEffect(() => {
    // Check if necessary data exists
    if (!formData || !letterType || !userType) {
      setError("Letter data is missing. Please go back and fill the form correctly.");
      setStatus('error');
      return;
    }

    // Prevent running twice in StrictMode
    if (effectRan.current) {
      return;
    }
    effectRan.current = true;
    setStatus('generating');
    setError(null);
    setPdfDataUri(null); // Clear previous data if any

    // Generate PDF data asynchronously
    generatePDFData(formData, letterType, userType)
      .then(({ dataUri, filename }) => {
        setPdfDataUri(dataUri);
        setPdfFileName(filename);
        setStatus('ready'); // PDF is ready for download
      })
      .catch((err) => {
        setError(`Failed to generate PDF: ${err.message}. Please check the console for details.`);
        setStatus('error');
      });

  }, [formData, letterType, userType, generatePDFData]); // Add generatePDFData to dependencies

  // --- Handle Download Button Click ---
  const handleDownloadClick = () => {
    if (!pdfDataUri || status !== 'ready') return;

    try {
        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = pdfDataUri;
        link.download = pdfFileName || 'LazyLetter.pdf'; // Use stored filename or a default
        document.body.appendChild(link); // Append to body to make it clickable
        link.click(); // Simulate click
        document.body.removeChild(link); // Clean up the link
    } catch (err) {
         console.error("Error triggering download:", err);
         setError("Could not trigger the download. Please try again or check browser settings.");
         setStatus('error');
    }
  };

  return (
    <div className="download card">
      {status === 'generating' && (
        <>
          <div className="download__spinner" aria-hidden="true"></div>
          <p className="download__message">Generating your letter PDF...</p>
        </>
      )}
      {status === 'ready' && (
        <>
          <p className="download__message">✅ Your letter PDF is ready!</p>
          <button
             onClick={handleDownloadClick}
             className="button button--primary download__link"
             style={{ marginBottom: 'var(--spacing-unit)' }} // Add some space below button
          >
            Download Letter
          </button>
        </>
      )}
      {status === 'error' && (
         <p className="download__message download__message--error">{error}</p>
      )}
       {/* Always show Back to Home link */}
      <Link to="/" className="button button--secondary download__link">
        Back to Home
      </Link>
    </div>
  );
}

export default LetterDownload;