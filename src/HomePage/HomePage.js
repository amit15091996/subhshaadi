import React, { useEffect, useState } from "react";
import ApiContextHooks from "../hooks/ApiContextHooks";
import { publicInterceptor } from "../services/AxiosConfig";
import './Home_Page.css';
import { useNavigate } from "react-router";

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    mobileNumber: '',
    dob: '',
    gender: '',
    religion: '',
    community: '',
    livingIn: '',
    motherTongue: '',
    profileImage: '',
    age: '',
    langKnown: [], // Added langKnown field
  });
  const [countdown, setCountdown] = useState(0); // State for countdown
  const navigate = useNavigate(); // Initialize useNavigate

  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [availableLanguages] = useState(['English', 'Spanish', 'French','German', 'Chinese', 'Japanese', 'Russian']);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownSelect = (language) => {
    if (language && !chips.includes(language)) {
      setChips([...chips, language]);
      // Update formData with selected languages
      setFormData(prev => ({ ...prev, langKnown: [...prev.langKnown, language] }));
    }
    setDropdownVisible(false);
  };

  const removeChip = (chip) => {
    setChips(chips.filter(c => c !== chip));
    // Update formData when a language is removed
    setFormData(prev => ({ ...prev, langKnown: prev.langKnown.filter(c => c !== chip) }));
  };

  const handleBeginClick = () => {
    setShowModal(true);
  };

  const api = ApiContextHooks();
  const auth = new api.authService(publicInterceptor("multipart/form-data"));

  const register = async () => {
    try {
      const data = await auth.getData("dewangan");
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    register();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e, "log for submit");
    const response = await auth.registerUser(formData);
    console.log(response);
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // Navigate to login after countdown reaches 0
      if (countdown === 0) {
        clearInterval(timer);
        navigate("/login");
      }

      return () => clearInterval(timer);
    }
  }, [countdown, navigate]);

  return (
    <div id="homepage" className="container-main">
      <div className="row">
        <h1
          className="common_headline__3GyDZ"
          data-testid="homepage_headline"
          style={{
            color: "lightseagreen",
            textAlign: "center",
            fontSize: "30px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Trusted Matrimony & Matchmaking Service
        </h1>
        <div className="container">
          <div className="dropdown-container">
            <div className="dropdown-label">
              <label
                htmlFor="dropdown"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                I'm looking for
              </label>
              <select id="dropdown1">
                <option value="Woman">Woman</option>
                <option value="Man">Man</option>
              </select>
            </div>
            <div className="dropdown-label">
              <label
                htmlFor="dropdown"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Age
              </label>
              <select id="dropdown2">
                <option>20</option>
                <option>21</option>
                <option>22</option>
              </select>
            </div>
            <span className="word" style={{ fontFamily: "Arial, sans-serif" }}>
              to
            </span>
            <div className="dropdown-label">
              <label
                htmlFor="dropdown"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                From
              </label>
              <select id="dropdown3">
                <option>20</option>
                <option>21</option>
                <option>22</option>
              </select>
            </div>
            <div className="dropdown-label">
              <label
                htmlFor="dropdown"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Religion
              </label>
              <select id="dropdown4">
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Sikh">Sikh</option>
              </select>
            </div>
            <div className="dropdown-label">
              <label
                htmlFor="dropdown"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Mother Tongue
              </label>
              <select id="dropdown5">
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="Marathi">Marathi</option>
              </select>
            </div>
            <div className="dropdown-label">
              <button className="begin-button" onClick={handleBeginClick}>
                Let's Begin
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="modal show"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content" style={{ backgroundColor: '#f8edeb' }}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  User Registration
                </h5>
                {/* <button
               type="button"
               className="btn-close"
               onClick={() => setShowModal(false)}
               aria-label="Close"
             ></button> */}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="firstNameInput" className="form-label">
                        First Name:
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="firstNameInput"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="lastNameInput" className="form-label">
                        Last Name:
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="lastNameInput"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="religionSelect">Religion:</label>
                      <select
                        className="form-control form-control-sm"
                        id="religionSelect"
                        name="religion"
                        value={formData.religion}
                        onChange={handleChange}
                      >
                        <option value="">Select Religion</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Muslim">Muslim</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="genderSelect">Gender:</label>
                      <select
                        className="form-control form-control-sm"
                        id="genderSelect"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="dobInput" className="form-label">
                        Date of Birth:
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        id="dobInput"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </div>
                    {/* hey */}
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="middleNameInput" className="form-label">
                        Middle Name:
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="middleNameInput"
                        name="middleName"
                        placeholder="Enter your middle name"
                        value={formData.middleName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobileInput" className="form-label">
                        Mobile Number:
                      </label>
                      <input
                        type="tel"
                        className="form-control form-control-sm"
                        id="mobileInput"
                        name="mobileNumber"
                        placeholder="Enter your mobile number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="passwordInput" className="form-label">
                        Password:
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        id="passwordInput"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPasswordInput" className="form-label">
                        Confirm Password:
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        id="confirmPasswordInput"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="languageInput" className="form-label">
                        Languages Known:
                      </label>
                      <div id="chip-container" className="d-flex flex-wrap mb-2">
                        {chips.map((chip, index) => (
                          <div key={index} className="chip bg-primary text-white rounded-pill d-flex align-items-center me-2 mb-2 px-2">
                            {chip}
                            <button
                              type="button"
                              className="btn-close btn-close-white ms-2"
                              aria-label="Remove"
                              onClick={() => removeChip(chip)}
                            ></button>
                          </div>
                        ))}
                      </div>
                      <div className="position-relative">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleDropdownToggle}
                        >
                          Select Languages
                        </button>
                        {dropdownVisible && (
                          <ul className="dropdown-menu show position-absolute mt-2" style={{ zIndex: 1000 }}>
                            {availableLanguages.map((language, index) => (
                              <li key={index}>
                                <button
                                  type="button"
                                  className="dropdown-item"
                                  onClick={() => handleDropdownSelect(language)}
                                >
                                  {language}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="profileImage" className="form-label">
                        Upload Your Photo: (JPG ONLY)
                      </label>
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        id="profileImage"
                        name="profileImage"
                        onChange={handleChange} // Handle file change
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="communitySelect">Community:</label>
                      <select
                        className="form-control form-control-sm"
                        id="communitySelect"
                        name="community"
                        value={formData.community}
                        onChange={handleChange}
                      >
                        <option value="">Select Community</option>
                        <option value="General">General</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="OBC">OBC</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="motherTongueSelect">Mother Tongue:</label>
                      <select
                        className="form-control form-control-sm"
                        id="motherTongueSelect"
                        name="motherTongue"
                        value={formData.motherTongue}
                        onChange={handleChange}
                      >
                        <option value="">Select Mother Tongue</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Telugu">Telugu</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="livingInInput">Living In:</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="livingInInput"
                        name="livingIn"
                        placeholder="Enter your current location"
                        value={formData.livingIn}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="age">Age:</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="age"
                        name="age"
                        placeholder="Enter your Age"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {countdown > 0 && (
        <div className="countdown">
          <h3>Navigating to login in {countdown}...</h3>
        </div>
      )}
    </div>
  );
}

export default HomePage;
