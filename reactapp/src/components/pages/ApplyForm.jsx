import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserAlt, FaStore, FaCheckCircle } from "react-icons/fa";
import '../../components/css/ApplyForm.css';

function ApplyForm() {
  const navigate = useNavigate();

  // --- Core State ---
  const [formData, setFormData] = useState({
    name: "",
    spices: "",
    experience: "",
    storeLocation: "",
    phoneNumber: ""
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // Step state

  // --- Validation ---
  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = "Name is required";
    else if (!/^[A-Za-z ]+$/.test(formData.name)) errs.name = "Name must not contain special characters or numbers";

    if (!formData.spices) errs.spices = "Spices are required";
    if (!formData.experience) errs.experience = "Experience is required";
    else if (Number(formData.experience) < 0) errs.experience = "Experience must be a non-negative number";

    if (!formData.storeLocation) errs.storeLocation = "Store location is required";
    if (!formData.phoneNumber) errs.phoneNumber = "Phone Number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber)) errs.phoneNumber = "Phone Number must be exactly 10 digits";

    return errs;
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }
    setErrors({});

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://spice-backend-f6cq.onrender.com/addSpiceMerchant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Application submitted successfully! ✅");
        setFormData({ name: "", spices: "", experience: "", storeLocation: "", phoneNumber: "" });
        navigate("/success");
      } else {
        const errorText = await res.text();
        toast.error(`Submission failed: ${errorText}`);
      }
    } catch (err) {
      console.error("Network error:", err);
      toast.error("A network error occurred. Please try again.");
    }
  };

  const nextStep = () => {
    const validationErrors = validate();
    if (step === 1 && (validationErrors.name || validationErrors.phoneNumber)) {
      setErrors({ name: validationErrors.name, phoneNumber: validationErrors.phoneNumber });
      toast.error("Please fill out your personal details correctly.");
      return;
    }
    if (step === 2 && (validationErrors.spices || validationErrors.experience || validationErrors.storeLocation)) {
      setErrors({
        spices: validationErrors.spices,
        experience: validationErrors.experience,
        storeLocation: validationErrors.storeLocation,
      });
      toast.error("Please provide valid business details.");
      return;
    }
    setErrors({});
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="apply-form-container">
      <div className="apply-form-card">
        {/* Left Panel: Progress + Illustrations */}
        <div className="form-info-panel">
          <div className="progress-bar">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-icon"><FaUserAlt /></div>
              <p>Personal</p>
            </div>
            <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-icon"><FaStore /></div>
              <p>Business</p>
            </div>
            <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-icon"><FaCheckCircle /></div>
              <p>Review</p>
            </div>
          </div>

          <div className="illustration-container">
            {step === 1 && <img src="https://plus.unsplash.com/premium_vector-1724261115343-83f125119275?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29uYWx8ZW58MHx8MHx8fDA%3D" alt="Personal Details" />}
            {step === 2 && <img src="https://images.unsplash.com/vector-1747845727587-7f2ae5d8fa95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJ1c2luZXNzfGVufDB8fDB8fHww" />}
            {step === 3 && <img src="https://plus.unsplash.com/premium_vector-1705741561239-37ff284b50ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdW1lbnR8ZW58MHx8MHx8fDA%3D" />}
          </div>

          <div className="info-content">
            {step === 1 && <p>Let's start with some basic information about you.</p>}
            {step === 2 && <p>Tell us about your business vision and experience.</p>}
            {step === 3 && <p>Please review your application details before submission.</p>}
          </div>
        </div>

        {/* Right Panel: Form Steps */}
        <div className="form-steps-panel">
          {step === 1 && (
            <div className="form-step active-step">
              <h2>Personal Details</h2>
              <div className="input-group">
                <label>Full Name:</label>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Anjali Kumar" />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="input-group">
                <label>Phone Number:</label>
                <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="10-digit mobile number" />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step active-step">
              <h2>Business Details</h2>
              <div className="input-group">
                <label>Key Spices You'll Specialize In:</label>
                <input name="spices" value={formData.spices} onChange={handleChange} placeholder="e.g., Turmeric, Saffron" />
                {errors.spices && <p className="error">{errors.spices}</p>}
              </div>
              <div className="input-group">
                <label>Experience (in years):</label>
                <input name="experience" type="number" value={formData.experience} onChange={handleChange} placeholder="e.g., 5" />
                {errors.experience && <p className="error">{errors.experience}</p>}
              </div>
              <div className="input-group">
                <label>Proposed Store Location (City):</label>
                <input name="storeLocation" value={formData.storeLocation} onChange={handleChange} placeholder="e.g., Coimbatore" />
                {errors.storeLocation && <p className="error">{errors.storeLocation}</p>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step active-step review-step">
              <h2>Review Your Application</h2>
              <div className="review-item"><strong>Name:</strong><p>{formData.name}</p></div>
              <div className="review-item"><strong>Phone:</strong><p>{formData.phoneNumber}</p></div>
              <div className="review-item"><strong>Spices:</strong><p>{formData.spices}</p></div>
              <div className="review-item"><strong>Experience:</strong><p>{formData.experience} years</p></div>
              <div className="review-item"><strong>Location:</strong><p>{formData.storeLocation}</p></div>
            </div>
          )}

          <div className="form-navigation">
            {step > 1 && <button className="prev-btn" onClick={prevStep}>Previous Step</button>}
            {step < 3 && <button className="next-btn" onClick={nextStep}>Next Step</button>}
            {step === 3 && <button className="submit-btn" onClick={handleSubmit}>Submit Application</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyForm;
