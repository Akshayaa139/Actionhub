import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import "../styles/Reports.css";
import { useNavigate } from 'react-router-dom';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Reports = () => {
  const navigate = useNavigate();
  const taskData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#4a90e2',
        tension: 0.4,
      },
    ],
  };

  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
      },
    ],
  };

  // Options to handle chart destruction
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="reports-container">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
          &larr; Back to Dashboard
        </button>
      <h2>Analytics Reports</h2>
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Task Completion Trend</h3>
          <div className="chart-container">
            <Line 
              data={taskData} 
              options={chartOptions} 
              id="taskCompletionChart"
            />
          </div>
        </div>
        <div className="chart-card">
          <h3>Task Priority Distribution</h3>
          <div className="chart-container">
            <Pie 
              data={priorityData} 
              options={chartOptions} 
              id="priorityDistributionChart"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;