import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New task assigned', time: '5m ago', unread: true },
    { id: 2, message: 'Team meeting in 30m', time: '10m ago', unread: true },
    { id: 3, message: 'Project deadline updated', time: '1h ago', unread: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [userProfile] = useState({
    name: 'Akshayaa',
    level: 5,
    points: 270,
    nextLevel: 300,
    avatar: 'A'
  });

  const [stats] = useState({
    weeklyTasks: 14,
    totalPoints: 270,
    teamMembers: 5,
    dueTasks: 8,
    completionRate: '85%',
    trend: '+18%'
  });

  const [recentActivity] = useState([
    { id: 1, task: 'Website Design', time: '2 hours ago', type: 'completion' },
    { id: 2, task: 'API Integration', time: '3 hours ago', type: 'started' },
    { id: 3, task: 'Bug Fix #123', time: '5 hours ago', type: 'review' },
    { id: 4, task: 'UI Improvement', time: '30 minutes ago', type: 'update' }
  ]);

  const [progress] = useState({
    tasks: { completed: 14, total: 15 },
    points: { earned: 270, total: 300 },
    challenges: { completed: 3, total: 5 }
  });

  // Session timeout setup
  const [lastActivity, setLastActivity] = useState(Date.now());
  const SESSION_TIMEOUT = 5 * 1000; // 30 minutes in milliseconds

  // Reset the session timer on user activity
  const resetSessionTimer = () => {
    setLastActivity(Date.now());
  };

  // Logout function
  const handleLogout = () => {
    // Clear session data (e.g., tokens, user info)
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/login');
  };

  // Check for session timeout
  useEffect(() => {
    const checkSessionTimeout = () => {
      const currentTime = Date.now();
      if (currentTime - lastActivity > SESSION_TIMEOUT) {
        handleLogout(); // Logout if session has expired
      }
    };

    const activityListener = () => resetSessionTimer();

    // Add event listeners for user activity
    window.addEventListener('mousemove', activityListener);
    window.addEventListener('keydown', activityListener);

    // Check session timeout every minute
    const sessionCheckInterval = setInterval(checkSessionTimeout, 60 * 1000);

    // Cleanup event listeners and interval
    return () => {
      window.removeEventListener('mousemove', activityListener);
      window.removeEventListener('keydown', activityListener);
      clearInterval(sessionCheckInterval);
    };
  }, [lastActivity, navigate]);

  const handleNotificationClick = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
    setNotificationCount(prev => Math.max(0, prev - 1));
  };

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard', active: true },
    { icon: '✅', label: 'Tasks', path: '/tasks' },
    { icon: '🏆', label: 'Achievements', path: '/achievements' },
    { icon: '👥', label: 'Team', path: '/team' },
    { icon: '📈', label: 'Reports', path: '/reports' },
    { icon: '⚙️', label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="app-brand">
            <span className="app-icon">🚀</span>
            {!isSidebarCollapsed && <h2>ActionHub</h2>}
          </div>
          <button
            className="collapse-button"
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">{userProfile.avatar}</div>
          {!isSidebarCollapsed && (
            <div className="user-info">
              <h3>{userProfile.name}</h3>
              <div className="level-badge">
                Level {userProfile.level}
                <div className="level-progress">
                  <div
                    className="level-fill"
                    style={{
                      width: `${(userProfile.points / userProfile.nextLevel) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`nav-item ${item.active ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              {!isSidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <header className="content-header">
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search tasks, projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          {/* User Menu */}
          <div className="user-menu">
            {/* Notifications */}
            <div className="notifications">
              <button
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                🔔
                {notificationCount > 0 && (
                  <span className="notification-badge">{notificationCount}</span>
                )}
              </button>

              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4>Notifications</h4>
                    <button
                      className="mark-read"
                      onClick={() => {
                        setNotifications(prev =>
                          prev.map(n => ({ ...n, unread: false }))
                        );
                        setNotificationCount(0);
                      }}
                    >
                      Mark all as read
                    </button>
                  </div>
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`notification-item ${notification.unread ? 'unread' : ''}`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="profile-dropdown">
              <button
                className="profile-button"
                onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <span className="avatar">{userProfile.avatar}</span>
                <span className="name">{userProfile.name}</span>
              </button>

              {isProfileDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate('/profile')}>👤 Profile</button>
                  <button onClick={() => navigate('/settings')}>⚙️ Settings</button>
                  <button onClick={handleLogout}>🚪 Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-container">
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">📅</div>
              <div className="stat-content">
                <h4>Weekly Tasks</h4>
                <div className="stat-value">
                  <h2>{stats.weeklyTasks}</h2>
                  <span className={`trend positive`}>{stats.trend}</span>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">⭐</div>
              <div className="stat-content">
                <h4>Total Points</h4>
                <div className="stat-value">
                  <h2>{stats.totalPoints}</h2>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">👥</div>
              <div className="stat-content">
                <h4>Team Members</h4>
                <div className="stat-value">
                  <h2>{stats.teamMembers}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="dashboard-section">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.type === 'completion' && '✅'}
                    {activity.type === 'started' && '🚀'}
                    {activity.type === 'review' && '🔍'}
                    {activity.type === 'update' && '✨'}
                  </div>
                  <div>
                    <p>{activity.task}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Section */}
          <div className="dashboard-section">
            <h3>Progress Overview</h3>
            <div className="progress-items">
              <div className="progress-item">
                <div className="progress-header">
                  <span>Tasks Completed</span>
                  <span>{progress.tasks.completed}/{progress.tasks.total}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill blue" 
                    style={{ width: `${(progress.tasks.completed/progress.tasks.total)*100}%` }}
                  ></div>
                </div>
              </div>

              <div className="progress-item">
                <div className="progress-header">
                  <span>Points Earned</span>
                  <span>{progress.points.earned}/{progress.points.total}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill purple" 
                    style={{ width: `${(progress.points.earned/progress.points.total)*100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;