import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "../styles/Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      desktop: true,
      updates: true
    },
    appearance: {
      darkMode: false,
      fontSize: 'medium',
      colorScheme: 'blue'
    },
    privacy: {
      profileVisibility: 'public',
      activityStatus: true,
      showEmail: false
    },
    language: 'english'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleAppearanceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: typeof value === 'boolean' ? !value : value
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('userSettings', JSON.stringify(settings));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
          &larr; Back to Dashboard
        </button>
        <h2>Settings</h2>
        <button 
          className="save-button" 
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h3>Notifications</h3>
          <div className="setting-item">
            <label>Email Notifications</label>
            <input 
              type="checkbox" 
              checked={settings.notifications.email}
              onChange={() => handleNotificationChange('email')}
            />
          </div>
          <div className="setting-item">
            <label>Push Notifications</label>
            <input 
              type="checkbox" 
              checked={settings.notifications.push}
              onChange={() => handleNotificationChange('push')}
            />
          </div>
          <div className="setting-item">
            <label>Desktop Notifications</label>
            <input 
              type="checkbox" 
              checked={settings.notifications.desktop}
              onChange={() => handleNotificationChange('desktop')}
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="setting-item">
            <label>Dark Mode</label>
            <input 
              type="checkbox" 
              checked={settings.appearance.darkMode}
              onChange={() => handleAppearanceChange('darkMode', !settings.appearance.darkMode)}
            />
          </div>
          <div className="setting-item">
            <label>Font Size</label>
            <select 
              value={settings.appearance.fontSize}
              onChange={(e) => handleAppearanceChange('fontSize', e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="setting-item">
            <label>Color Scheme</label>
            <select 
              value={settings.appearance.colorScheme}
              onChange={(e) => handleAppearanceChange('colorScheme', e.target.value)}
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3>Privacy</h3>
          <div className="setting-item">
            <label>Profile Visibility</label>
            <select 
              value={settings.privacy.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>
          <div className="setting-item">
            <label>Show Activity Status</label>
            <input 
              type="checkbox" 
              checked={settings.privacy.activityStatus}
              onChange={() => handlePrivacyChange('activityStatus', settings.privacy.activityStatus)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;