import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MarriageProfileList.css"; // Import CSS for styling

const API_BASE_URL = "http://localhost:7878/api/v1/user/profiles";
const IMAGE_API_URL = "http://localhost:7878/api/v1/user/profile-image";
const HARD_CODED_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4ODcxNjQxMjg2IiwiaWF0IjoxNzIzNzg1MDAzLCJleHAiOjE3MjM4NzE0MDN9.U7nAW8r-Ekc3FIBP5rfxixtr5mUM0jWISuqvC1c5NAk";

const MarriageProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(API_BASE_URL, {
          params: {
            gender: "Female", // or 'Male', or other values based on your requirement
            page: 0,
            size: 10,
            sortBy: "firstName",
          },
          headers: {
            Authorization: `Bearer ${HARD_CODED_TOKEN}`,
          },
        });
        setProfiles(response.data.result);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profiles:", err);
        setError("Failed to load profiles. Please try again later.");
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const fetchProfileImage = async (mobileNumber) => {
    try {
      const response = await axios.get(
        `${IMAGE_API_URL}?mobileNumber=${mobileNumber}`,
        {
          responseType: "blob", // To handle binary data
          headers: {
            Authorization: `Bearer ${HARD_CODED_TOKEN}`,
          },
        }
      );
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching profile image:", error);
      return ""; // Fallback to an empty string or a placeholder image URL
    }
  };

  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      const urls = {};
      for (const profile of profiles) {
        const imageUrl = await fetchProfileImage(profile.mobileNumber);
        urls[profile.mobileNumber] = imageUrl;
      }
      setImageUrls(urls);
    };

    if (profiles.length > 0) {
      loadImages();
    }
  }, [profiles]);

  if (loading) return <p>Loading profiles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-container">
    <h2>Marriage Profiles</h2>
    <div className="profile-grid">
        {profiles.map(profile => (
            <div key={profile.mobileNumber} className="profile-card">
                <div className="profile-image">
                    <img src={imageUrls[profile.mobileNumber] || 'placeholder-image-url'} alt={`${profile.firstName} ${profile.lastName}`} />
                </div>
                <div className="profile-content">
                    <div className="profile-header">
                        <h3>{profile.firstName} {profile.lastName}</h3>
                        <p><strong>Age:</strong> {profile.age}</p>
                    </div>
                    <div className="profile-body">
                        <div className="profile-body-left">
                            <p><strong>Mobile:</strong> {profile.mobileNumber}</p>
                            <p><strong>Languages:</strong> {Array.isArray(profile.langKnown) ? profile.langKnown.join(', ') : profile.langKnown}</p>
                            <p><strong>Religion:</strong> {profile.religion}</p>
                        </div>
                        <div className="profile-body-right">
                            <p><strong>Community:</strong> {profile.community}</p>
                            <p><strong>Gender:</strong> {profile.gender}</p>
                            <p><strong>Date of Birth:</strong> {profile.dob}</p>
                            {/* <p><strong>Residence:</strong> {profile.residence}</p> */}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>

  );
};

export default MarriageProfileList;
