import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "../styles/Team.css";

const Team = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Akshayaa',
      role: 'Team Lead',
      avatar: '👨‍💼',
      status: 'online',
      email: 'akshlearn123@gmail.com',
      projects: 8,
      tasksCompleted: 124,
      skills: ['React', 'Node.js', 'Project Management']
    },
    {
      id: 2,
      name: 'Abinaya',
      role: 'Senior Developer',
      avatar: '👩‍💻',
      status: 'online',
      email: 'abihome32@gmail.com',
      projects: 6,
      tasksCompleted: 89,
      skills: ['React', 'TypeScript', 'UI/UX']
    },
    {
      id: 3,
      name: 'Srivishnu',
      role: 'Designer',
      avatar: '👨‍🎨',
      status: 'offline',
      email: 'vishnu123@gmail.com',
      projects: 5,
      tasksCompleted: 67,
      skills: ['Figma', 'Adobe XD', 'UI Design']
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    email: '',
    skills: ''
  });

  const [selectedMember, setSelectedMember] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role || !newMember.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    const member = {
      id: Date.now(),
      ...newMember,
      avatar: '👤',
      status: 'online',
      projects: 0,
      tasksCompleted: 0,
      skills: newMember.skills.split(',').map(skill => skill.trim())
    };

    setTeamMembers([...teamMembers, member]);
    setShowAddModal(false);
    setNewMember({ name: '', role: '', email: '', skills: '' });
    toast.success('Team member added successfully!');
  };

  const handleViewProfile = (member) => {
    setSelectedMember(member);
    setShowProfileModal(true);
  };

  const getTeamStats = () => {
    return {
      totalMembers: teamMembers.length,
      onlineMembers: teamMembers.filter(m => m.status === 'online').length,
      totalProjects: teamMembers.reduce((acc, curr) => acc + curr.projects, 0),
      totalTasks: teamMembers.reduce((acc, curr) => acc + curr.tasksCompleted, 0)
    };
  };

  const stats = getTeamStats();

  return (
    <div className="team-container">
      <div className="team-header">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
          &larr; Back to Dashboard
        </button>
        <h2>Team Management</h2>
        <button 
          className="add-member-button"
          onClick={() => setShowAddModal(true)}
        >
          Add Team Member
        </button>
      </div>

      <div className="team-stats">
        <div className="stat-card">
          <h3>{stats.totalMembers}</h3>
          <p>Team Members</p>
        </div>
        <div className="stat-card">
          <h3>{stats.onlineMembers}</h3>
          <p>Online Members</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalProjects}</h3>
          <p>Active Projects</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalTasks}</h3>
          <p>Tasks Completed</p>
        </div>
      </div>

      <div className="team-content">
        {teamMembers.map(member => (
          <div key={member.id} className="team-member">
            <div className={`member-avatar ${member.status}`}>
              {member.avatar}
            </div>
            <div className="member-info">
              <h4>{member.name}</h4>
              <p className="member-role">{member.role}</p>
              <div className="member-skills">
                {member.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="member-actions">
              <button 
                className="view-profile-button"
                onClick={() => handleViewProfile(member)}
              >
                View Profile
              </button>
              <div className={`status-indicator ${member.status}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Team Member</h3>
            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({...newMember, name: e.target.value})}
            />
            <input
              type="text"
              placeholder="Role"
              value={newMember.role}
              onChange={(e) => setNewMember({...newMember, role: e.target.value})}
            />
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({...newMember, email: e.target.value})}
            />
            <input
              type="text"
              placeholder="Skills (comma-separated)"
              value={newMember.skills}
              onChange={(e) => setNewMember({...newMember, skills: e.target.value})}
            />
            <div className="modal-actions">
              <button onClick={handleAddMember}>Add Member</button>
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && selectedMember && (
        <div className="modal">
          <div className="modal-content profile-modal">
            <div className="profile-header">
              <div className="profile-avatar">{selectedMember.avatar}</div>
              <h3>{selectedMember.name}</h3>
              <p>{selectedMember.role}</p>
            </div>
            <div className="profile-details">
              <div className="detail-item">
                <span>Email:</span>
                <span>{selectedMember.email}</span>
              </div>
              <div className="detail-item">
                <span>Projects:</span>
                <span>{selectedMember.projects}</span>
              </div>
              <div className="detail-item">
                <span>Tasks Completed:</span>
                <span>{selectedMember.tasksCompleted}</span>
              </div>
              <div className="detail-item">
                <span>Skills:</span>
                <div className="skills-list">
                  {selectedMember.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => setShowProfileModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;