import React, { useState } from 'react';
import "../styles/Profile.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Akshayaa',
    email: 'akshlearn13@gmail.com',
    level: 5,
    totalPoints: 250,
    joinDate: '2024-01-01',
    completedTasks: 45,
    achievements: 12,
    profilePic: null // Added profilePic field
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add API call to save profile data
    console.log('Profile data saved:', profileData);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data (optional)
    setProfileData({
      name: 'Akshayaa',
      email: 'akshlearn13@gmail.com',
      level: 5,
      totalPoints: 250,
      joinDate: '2024-01-01',
      completedTasks: 45,
      achievements: 12,
      profilePic: null
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData({ ...profileData, profilePic: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e, key) => {
    setProfileData({ ...profileData, [key]: e.target.value });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          &larr; Back to Dashboard
        </button>
        <h2>Profile</h2>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="save-button" onClick={handleSave}>
                Save Changes
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-button" onClick={handleEdit}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-info">
          <div className="avatar-section">
            <div className="avatar">
              {profileData.profilePic ? (
                <img src={profileData.profilePic} alt="Profile" />
              ) : (
                <span>{profileData.name.charAt(0)}</span>
              )}
            </div>
            {isEditing && (
              <div className="file-upload">
                <label htmlFor="profile-pic-upload" className="upload-label">
                  Choose File
                </label>
                <input
                  id="profile-pic-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            )}
            <div className="level-badge">
              Level {profileData.level}
            </div>
          </div>

          <div className="info-fields">
            {Object.entries(profileData).map(([key, value]) => {
              if (key === 'profilePic' || key === 'level' || key === 'totalPoints') return null; // Skip non-editable fields
              return (
                <div className="info-group" key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                  {isEditing ? (
                    <input
                      type={key === 'joinDate' ? 'date' : 'text'}
                      value={value}
                      onChange={(e) => handleInputChange(e, key)}
                    />
                  ) : (
                    <span>{value}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <h4>Tasks Completed</h4>
            <div className="value">{profileData.completedTasks}</div>
          </div>
          <div className="stat-card">
            <h4>Achievements</h4>
            <div className="value">{profileData.achievements}</div>
          </div>
          <div className="stat-card">
            <h4>Total Points</h4>
            <div className="value">{profileData.totalPoints}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;