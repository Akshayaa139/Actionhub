import React, { useState } from 'react';
import "../styles/Achievements.css";
import { useNavigate } from 'react-router-dom';

const Achievements = () => {
  const navigate = useNavigate();
  const [achievements] = useState([
    {
      id: 1,
      icon: '🏆',
      title: 'First Task Completed',
      description: 'Completed your first task',
      progress: 100,
      isUnlocked: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      icon: '⭐',
      title: 'Level 5 Reached',
      description: 'Reached experience level 5',
      progress: 100,
      isUnlocked: true,
      date: '2024-01-20'
    },
    {
      id: 3,
      icon: '🎯',
      title: 'Task Master',
      description: 'Complete 50 tasks',
      progress: 72,
      isUnlocked: false,
      required: 50,
      current: 36
    },
    {
      id: 4,
      icon: '🌟',
      title: 'Team Player',
      description: 'Collaborate on 20 team tasks',
      progress: 45,
      isUnlocked: false,
      required: 20,
      current: 9
    }
  ]);

  return (
    <div className="achievements-container">
      <div className="achievements-header">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
          &larr; Back to Dashboard
        </button>
        <h2>Achievements</h2>
        <div className="achievements-summary">
          <span>{achievements.filter(a => a.isUnlocked).length} / {achievements.length} Unlocked</span>
        </div>
      </div>
      
      <div className="achievements-content">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`achievement-item ${!achievement.isUnlocked ? 'achievement-locked' : ''}`}
          >
            <span className="achievement-icon">{achievement.icon}</span>
            <div className="achievement-info">
              <h4>{achievement.title}</h4>
              <p>{achievement.description}</p>
              {!achievement.isUnlocked && achievement.current && (
                <div className="achievement-progress">
                  <div 
                    className="progress-fill"
                    style={{ width: `${achievement.progress}%` }}
                  />
                  <span className="progress-text">
                    {achievement.current} / {achievement.required}
                  </span>
                </div>
              )}
              {achievement.isUnlocked && (
                <div className="achievement-date">
                  Unlocked: {achievement.date}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;