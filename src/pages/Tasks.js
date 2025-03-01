import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "../styles/Tasks.css";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      {
        id: 1,
        title: 'Website Design',
        description: 'Create modern UI design for the dashboard',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-02-10',
        assignee: 'Akshayaa',
        tags: ['design', 'ui/ux']
      },
      {
        id: 2,
        title: 'Frontend Development',
        description: 'Implement responsive layouts and components',
        status: 'pending',
        priority: 'medium',
        dueDate: '2024-02-15',
        assignee: 'Abinaya',
        tags: ['development', 'react']
      }
    ];
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
    assignee: '',
    tags: []
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter(task => {
    const statusMatch = selectedStatus === 'all' || task.status === selectedStatus;
    const priorityMatch = selectedPriority === 'all' || task.priority === selectedPriority;
    return statusMatch && priorityMatch;
  });

  const handleAddTask = () => {
    if (!newTask.title || !newTask.dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setTasks(prev => [...prev, {
      id: Date.now(),
      ...newTask,
      tags: newTask.tags.filter(tag => tag.trim() !== '')
    }]);
    setShowAddModal(false);
    setNewTask({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
      assignee: '',
      tags: []
    });
    toast.success('Task added successfully!');
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    toast.success('Task status updated!');
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
      toast.success('Task deleted successfully!');
    }
  };

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          &larr; Back to Dashboard
        </button>
        <h2>ActionHub 🚀</h2>
        <button 
          className="add-task-button"
          onClick={() => setShowAddModal(true)}
        >
          Add New Task
        </button>
      </div>

      <div className="tasks-content">
        <div className="tasks-filters">
          <select 
            className="filter-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select 
            className="filter-select"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        <div className="tasks-list">
          {filteredTasks.map(task => (
            <div key={task.id} className={`task-item priority-${task.priority}`}>
              <div className="task-header">
                <h4>{task.title}</h4>
                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className={`status-${task.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-details">
                <span className="task-due-date">Due: {task.dueDate}</span>
                <span className="task-assignee">Assignee: {task.assignee}</span>
              </div>
              <div className="task-tags">
                {task.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Task</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button className="primary-button" onClick={handleAddTask}>
                Add Task
              </button>
              <button className="secondary-button" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;