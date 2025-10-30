import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChildInformationStep from './components/ChildInformationStep';
import ParentsInformationStep from './components/ParentsInformationStep';
import DocumentUploadStep from './components/DocumentUploadStep';
import ReviewSubmitStep from './components/ReviewSubmitStep';
import logo from '../../logo.svg'; // Import the logo

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    childInfo: {},
    motherInfo: {
      fullName: '', dateOfBirth: '', nationality: '', idNumber: '',
      ageAtBirth: '', placeOfBirth: '', address: '', city: '', state: '',
      zipCode: '', phone: '', email: '', occupation: '', education: ''
    },
    fatherInfo: {
      fullName: '', dateOfBirth: '', nationality: '', idNumber: '', isUnknown: false,
      ageAtBirth: '', placeOfBirth: '', address: '', city: '', state: '',
      zipCode: '', phone: '', email: '', occupation: '', education: ''
    },
    documents: {},
    agreements: {},
    contactInfo: {}
  });

  const [applicationId, setApplicationId] = useState(null); // New state for applicationId

  // Utility function to generate a unique certificate number (simulate backend)
  const generateUniqueCertificateNumber = () => {
    const prefix = "LFC-BC-";
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${prefix}${timestamp}-${random}`;
  };

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "parent"
  };

  const steps = [
    { id: 1, label: 'Child Info', description: 'Child information' },
    { id: 2, label: 'Parents Info', description: 'Parents information' },
    { id: 3, label: 'Documents', description: 'Upload documents' },
    { id: 4, label: 'Review', description: 'Review & submit' }
  ];

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem('birthCertificateFormData');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('birthCertificateFormData', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
    
    // Clear errors for the updated section
    if (errors?.[section]) {
      setErrors(prev => ({
        ...prev,
        [section]: {}
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Child Information
        const childErrors = {};
        if (!formData?.childInfo?.fullName?.trim()) {
          childErrors.fullName = String('Child\'s full name is required');
        }
        if (!formData?.childInfo?.dateOfBirth) {
          childErrors.dateOfBirth = String('Date of birth is required');
        }
        if (!formData?.childInfo?.placeOfBirth?.trim()) {
          childErrors.placeOfBirth = String('Place of birth is required');
        }
        if (!formData?.childInfo?.gender) {
          childErrors.gender = String('Gender selection is required');
        }
        if (!formData?.childInfo?.cityOfBirth?.trim()) {
          childErrors.cityOfBirth = String('City of birth is required');
        }
        if (!formData?.childInfo?.stateOfBirth?.trim()) {
          childErrors.stateOfBirth = String('State of birth is required');
        }
        if (!formData?.childInfo?.countryOfBirth?.trim()) {
          childErrors.countryOfBirth = String('Country of birth is required');
        }

        if (!formData?.childInfo?.attendingDoctor && !formData?.childInfo?.attendingHospital) {
          childErrors.attendingDoctor = String('Please select either an attending doctor or a hospital.');
        }

        if (Object.keys(childErrors)?.length > 0) {
          newErrors.childInfo = childErrors;
        }
        break;

      case 2: // Parents Information
        const motherErrors = {};
        const fatherErrors = {};

        // Mother validation
        if (!formData?.motherInfo?.fullName?.trim()) {
          motherErrors.fullName = 'Mother\'s full name is required';
        }
        if (!formData?.motherInfo?.dateOfBirth) {
          motherErrors.dateOfBirth = 'Mother\'s date of birth is required';
        }
        if (!formData?.motherInfo?.nationality?.trim()) {
          motherErrors.nationality = 'Mother\'s nationality is required';
        }
        if (!formData?.motherInfo?.idNumber?.trim()) {
          motherErrors.idNumber = 'Mother\'s ID number is required';
        }

        // Father validation
        if (!formData?.fatherInfo?.isUnknown) {
          if (!formData?.fatherInfo?.fullName?.trim()) {
            fatherErrors.fullName = 'Father\'s full name is required';
          }
          if (!formData?.fatherInfo?.dateOfBirth) {
            fatherErrors.dateOfBirth = 'Father\'s date of birth is required';
          }
          if (!formData?.fatherInfo?.nationality?.trim()) {
            fatherErrors.nationality = 'Father\'s nationality is required';
          }
          if (!formData?.fatherInfo?.idNumber?.trim()) {
            fatherErrors.idNumber = 'Father\'s ID number is required';
          }
        }

        if (Object.keys(motherErrors)?.length > 0) {
          newErrors.motherInfo = motherErrors;
        }
        if (Object.keys(fatherErrors)?.length > 0) {
          newErrors.fatherInfo = fatherErrors;
        }
        break;

      case 3: // Documents
        const documentErrors = {};
        const requiredDocs = ['hospital_record', 'parent_id_mother', 'parent_id_father'];
        
        requiredDocs?.forEach(docId => {
          if (!formData?.documents?.[docId]) {
            documentErrors[docId] = String('This document is required');
          }
        });

        if (Object.keys(documentErrors)?.length > 0) {
          newErrors.documents = documentErrors;
        }
        break;

      case 4: // Review & Submit
        const agreementErrors = {};
        if (!formData?.agreements?.accuracy) {
          agreementErrors.accuracy = 'You must certify the accuracy of information';
        }
        if (!formData?.agreements?.medicalReview) {
          agreementErrors.medicalReview = 'You must agree to medical review';
        }
        if (!formData?.agreements?.dataProcessing) {
          agreementErrors.dataProcessing = 'You must agree to data processing';
        }
        if (!formData?.agreements?.fees) {
          agreementErrors.fees = 'You must acknowledge the fees';
        }

        if (Object.keys(agreementErrors)?.length > 0) {
          newErrors.agreements = agreementErrors;
        }
        break;
      default:
        console.warn("Unknown validation step:", step);
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (step) => {
    // Allow navigation to previous steps or current step
    if (step <= currentStep) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canNavigateToStep = (step) => {
    return step <= currentStep;
  };

  const saveDraft = () => {
    localStorage.setItem('birthCertificateFormData', JSON.stringify(formData));
    localStorage.setItem('birthCertificateFormStep', currentStep?.toString());
    
    // Show success message
    alert('Draft saved successfully! You can continue later from where you left off.');
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const applicationData = {
        childName: formData.childInfo.fullName,
        childDOB: formData.childInfo.dateOfBirth,
        placeOfBirth: formData.childInfo.placeOfBirth,
        gender: formData.childInfo.gender,
        weight: formData.childInfo.weight,
        cityOfBirth: formData.childInfo.cityOfBirth,
        stateOfBirth: formData.childInfo.stateOfBirth,
        countryOfBirth: formData.childInfo.countryOfBirth,
        motherName: formData.motherInfo.fullName,
        motherDOB: formData.motherInfo.dateOfBirth,
        motherNationality: formData.motherInfo.nationality,
        motherIDNumber: formData.motherInfo.idNumber,
        attendingDoctor: formData.childInfo.attendingDoctor || null,
        attendingHospital: formData.childInfo.attendingHospital || null,
        fatherName: formData.fatherInfo.isUnknown ? 'Unknown' : formData.fatherInfo.fullName,
        fatherDOB: formData.fatherInfo.isUnknown ? null : formData.fatherInfo.dateOfBirth,
        fatherNationality: formData.fatherInfo.isUnknown ? null : formData.fatherInfo.nationality,
        fatherIDNumber: formData.fatherInfo.isUnknown ? null : formData.fatherInfo.idNumber,
        contactEmail: formData.contactInfo.email,
        phoneNumber: formData.contactInfo.phoneNumber,
        residentialAddress: formData.contactInfo.address,
        // Documents will be uploaded in a separate step, so don't include here
        // documents: Object.values(formData.documents).map(doc => ({
        //   docId: doc.docId,
        //   fileName: doc.name,
        //   filePath: doc.url // Assuming 'url' from frontend is the 'filePath' for backend
        // })),
      };

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'), // Use actual token
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to submit application');
      }

      const result = await response.json();
      // Simulate backend auto-generation of certificateId
      const generatedCertificateId = generateUniqueCertificateNumber();
      const applicationNumber = generatedCertificateId; // Use the generated ID

      // Assuming the backend would return the full application object with the new certificateId
      // For now, we'll manually add it to the result for display purposes
      result.application = { ...result.application, certificateId: generatedCertificateId };

      // Set the application ID received from the backend
      setApplicationId(result.application._id); // Assuming _id is returned from backend

      // Clear saved form data
      localStorage.removeItem('birthCertificateFormData');
      localStorage.removeItem('birthCertificateFormStep');

      // Show success message
      alert(`Application submitted successfully!\n\nApplication Number: ${applicationNumber}\n\nYou will receive an email confirmation shortly. You can track your application status in your dashboard.`);

      // Navigate to parent dashboard
      navigate('/parent-dashboard');
    } catch (error) {
      console.error('Submission error:', error);
      setErrors(prev => ({ ...prev, general: String(error.message || 'Failed to submit application') }));
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    // Clear any user session data
    localStorage.removeItem('userSession');
    navigate('/authentication');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ChildInformationStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <ParentsInformationStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <DocumentUploadStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            applicationId={applicationId} // Pass applicationId to DocumentUploadStep
          />
        );
      case 4:
        return (
          <ReviewSubmitStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid bg-background min-vh-100">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-navbar-bg shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand text-navbar-text" href="/">
            <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2" />
            Birth Certificate Portal
          </a>
          <div className="d-flex">
            <span className="navbar-text me-3 text-navbar-text">Welcome, {mockUser.name}</span>
            <button className="btn btn-outline-alerts-error text-alerts-error" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Progress Navigation */}
      <div className="container mt-3">
        <div className="d-flex justify-content-between mb-4">
          {steps.map((stepItem) => (
            <div key={stepItem.id} className={`text-center flex-fill position-relative ${currentStep >= stepItem.id ? 'text-primary-button' : 'text-muted'}`}>
              <div 
                className={`rounded-circle border d-flex align-items-center justify-content-center mx-auto mb-2 ${currentStep >= stepItem.id ? 'bg-primary-button text-white border-primary-button' : 'bg-white text-muted border-borders-cards'}`}
                style={{ width: '36px', height: '36px', cursor: canNavigateToStep(stepItem.id) ? 'pointer' : 'not-allowed' }}
                onClick={() => canNavigateToStep(stepItem.id) && handleStepClick(stepItem.id)}
              >
                {stepItem.id}
              </div>
              <p className="small mb-0 text-text-general">{stepItem.label}</p>
              {stepItem.id < steps.length && (
                <hr 
                  className={`position-absolute top-50 start-50 translate-middle w-100 border-2 ${currentStep > stepItem.id ? 'border-primary-button' : 'border-borders-cards'}`}
                  style={{ zIndex: -1, marginLeft: '50%', width: '100%' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <main className="container px-4 py-5">
        {/* Page Header */}
        <div className="mb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/parent-dashboard" className="text-primary-button hover-text-accent-color">Dashboard</a></li>
              <li className="breadcrumb-item active text-text-general" aria-current="page">Application Form</li>
            </ol>
          </nav>
          <h1 className="display-5 fw-bold text-headings">Birth Certificate Application</h1>
          <p className="lead text-text-general mt-2">
            Complete all required information to submit your birth certificate request.
          </p>
        </div>

        {/* Form Content */}
        <div className="row">
          <div className="col-12">
            {renderStepContent()}

            {/* Navigation Footer */}
            {currentStep < 4 && (
              <div className="card mt-4 bg-white border border-borders-cards shadow-sm rounded-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary-button me-2 text-white hover-bg-accent-color"
                        onClick={saveDraft}
                        disabled={isSubmitting}
                      >
                        <i className="bi bi-save me-2"></i>Save Draft
                      </button>
                      <small className="text-muted">Your progress is automatically saved</small>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary-button me-2 text-primary-button hover-bg-accent-color hover-text-white"
                        onClick={handlePrevious}
                        disabled={currentStep === 1 || isSubmitting}
                      >
                        <i className="bi bi-chevron-left"></i>Previous
                      </button>
                      
                      <button
                        type="button"
                        className="btn btn-primary-button text-white hover-bg-accent-color"
                        onClick={handleNext}
                        disabled={isSubmitting}
                      >
                        Next Step <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="card bg-white mt-5 border-0 shadow-sm rounded-4">
          <div className="card-body">
            <div className="d-flex align-items-start">
              <i className="bi bi-question-circle-fill text-primary-button fs-4 me-3"></i>
              <div>
                <h3 className="h5 card-title text-headings mb-2">Need Help?</h3>
                <p className="card-text text-text-general mb-3">
                  If you have questions about completing this application or need assistance with document requirements, our support team is here to help.
                </p>
                <div className="d-flex gap-2">
                  <a href="tel:+1-555-123-4567" className="btn btn-outline-primary-button btn-sm text-primary-button hover-bg-accent-color hover-text-white">
                    <i className="bi bi-telephone-fill me-2"></i>Call Support: (555) 123-4567
                  </a>
                  <a href="mailto:support@lifecert.gov" className="btn btn-outline-primary-button btn-sm text-primary-button hover-bg-accent-color hover-text-white">
                    <i className="bi bi-envelope-fill me-2"></i>Email: support@lifecert.gov
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationForm;
