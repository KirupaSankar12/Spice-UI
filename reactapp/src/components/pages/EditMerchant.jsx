import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
// ⭐ Import icons
import { FaUser, FaPepperHot, FaRegChartBar, FaStore, FaPhone } from "react-icons/fa";
import "../css/EditMerchant.css"; // ⭐ New dedicated CSS

function EditMerchant() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    spices: "",
    experience: "",
    storeLocation: "",
    phoneNumber: ""
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Fetch merchant data
  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8080/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setFormData(data);
        } else {
          toast.error("Failed to fetch merchant data.");
          navigate("/manage-merchants");
        }
      } catch (err) {
        toast.error("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchMerchantData();
  }, [id, navigate]);

  // Validation
  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = "Name is required";
    else if (!/^[A-Za-z ]+$/.test(formData.name))
      errs.name = "Name must not contain special characters or numbers";

    if (!formData.spices) errs.spices = "Spices are required";

    if (!formData.experience) errs.experience = "Experience is required";
    else if (Number(formData.experience) < 0)
      errs.experience = "Experience must be a non-negative number";

    if (!formData.storeLocation) errs.storeLocation = "Store location is required";

    if (!formData.phoneNumber) errs.phoneNumber = "Phone Number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber))
      errs.phoneNumber = "Phone Number must be exactly 10 digits long";

    return errs;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }
    setErrors({});

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/put/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Merchant details updated successfully! ✅");
        navigate("/manage-merchants");
      } else {
        const errorText = await res.text();
        toast.error(`Update failed: ${errorText}`);
      }
    } catch (err) {
      toast.error("A network error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <ClipLoader color={"#d35400"} size={50} />
      </div>
    );
  }

  // --- Redesigned UI ---
  return (
    <div className="edit-page-container">
      <div className="edit-card">
        {/* Left Panel: Info */}
        <div className="info-panel">
          <div className="info-header">
            <h3>SPICE MERCHANTS</h3>
            <h1>Editing Application</h1>
          </div>
          <div className="info-details">
            <p><strong>Applicant:</strong> {formData.name}</p>
            <p><strong>Location:</strong> {formData.storeLocation}</p>
          </div>
          <p className="info-footer">
            Update the details on the right. Click 'Save Changes' to apply them permanently.
          </p>
        </div>

        {/* Right Panel: Form */}
        <div className="form-panel">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name"><FaUser className="input-icon" /> Full Name</label>
              <input id="name" name="name" value={formData.name} onChange={handleChange} />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="spices"><FaPepperHot className="input-icon" /> Spices</label>
              <input id="spices" name="spices" value={formData.spices} onChange={handleChange} />
              {errors.spices && <p className="error">{errors.spices}</p>}
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="experience"><FaRegChartBar className="input-icon" /> Experience (yrs)</label>
                <input id="experience" name="experience" type="number" value={formData.experience} onChange={handleChange} />
                {errors.experience && <p className="error">{errors.experience}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="storeLocation"><FaStore className="input-icon" /> Store Location</label>
                <input id="storeLocation" name="storeLocation" value={formData.storeLocation} onChange={handleChange} />
                {errors.storeLocation && <p className="error">{errors.storeLocation}</p>}
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="phoneNumber"><FaPhone className="input-icon" /> Phone Number</label>
              <input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => navigate("/manage-merchants")}>
                Cancel
              </button>
              <button type="submit" className="btn-save">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditMerchant;
