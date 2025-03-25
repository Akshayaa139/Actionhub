# Community-Based Task Management Tool

A digital platform designed to help groups, neighborhoods, or organizations collaboratively manage tasks, track progress, and ensure collective participation. This tool fosters transparency, accountability, and engagement, making it ideal for social initiatives, volunteer efforts, and local development projects.

## Table of Contents
- [How It’s Useful](#how-its-useful)
- [Scenario: Addressing Community Empowerment & Development](#scenario-addressing-community-empowerment--development)
- [Solution Using the Tool](#solution-using-the-tool)
- [Technology Stack](#technology-stack)
- [Video Demo](#video-demo)
- [Getting Started](#getting-started)

---

## How It’s Useful

- **Efficient Task Distribution**: Assigns tasks to community members based on skills and availability.
- **Real-time Collaboration**: Users can update progress, share insights, and request help.
- **Accountability & Transparency**: Everyone sees what needs to be done and who is responsible.
- **Automated Reminders & Deadlines**: Ensures tasks are completed on time.
- **Resource Management**: Tracks available resources and funding allocations.

---

## Scenario: Addressing Community Empowerment & Development

### Problem
A local community struggles with low participation in development initiatives, lack of skill-building opportunities, and poor communication among members, leading to slow progress in achieving collective goals.

---

## Solution Using the Tool

- **Task Assignment**: Community leaders assign tasks such as organizing workshops, skill-building sessions, and awareness campaigns to volunteers and members.
- **Progress Tracking**: Real-time updates on completed workshops, skill-building activities, and community events are shared.
- **Community Participation**: Members can suggest ideas, report issues, and collaborate on projects through the platform.
- **Impact Measurement**: The tool tracks improvements in community engagement, skill development, and overall progress toward development goals.

---

## Technology Stack

This project is built using the **MERN stack**:
- **MongoDB**: For database management.
- **Express.js**: For backend server operations.
- **React.js**: For the frontend user interface.
- **Node.js**: For server-side runtime environment.

The project also incorporates **SDG (Sustainable Development Goals)** principles and **Design Thinking** concepts to ensure a user-centric and impactful solution.

---

## Video Demo

A video demonstration of the project is available to showcase its features and functionality. [[Watch the Demo](https://youtu.be/zxtPYQEKKs8)](#)

---

**Getting Started**

Follow these steps to set up the project locally and run the Community-Based Task Management Tool:

**Prerequisites**
Node.js (v18 or higher) and npm installed.

MongoDB installed locally or a cloud instance (e.g., MongoDB Atlas).

**Git for cloning the repository.**

Setup Instructions
**Clone the repository:**

git clone https://github.com/Akshayaa139/Actionhub.git

**Navigate to the project directory:**

cd Actionhub 

**Set up the Frontend:**

Move to the frontend directory:

cd action  

**Install dependencies:**

npm install  

**Start the React frontend:**

npm start  

The frontend will open at http://localhost:3000.

**Set up the Backend:**

Open a new terminal window and navigate to the backend directory from the root folder:

cd backend  


**Configure MongoDB:**

Ensure MongoDB is running locally (start the service with mongod or via your OS’s system manager).

Create a .env file in the backend directory and add your MongoDB connection URI:


MONGODB_URI=mongodb://localhost:27017/actionhub  
PORT=5000  

**Start the backend server:**

node server.js  
The backend will run at http://localhost:5000.

**Verify the Setup:**

Ensure both frontend (port 3000) and backend (port 5000) servers are running.

**Access the application via** http://localhost:3000 in your browser.

**Notes**
Replace the MONGODB_URI in .env with your MongoDB Atlas URI if using a cloud database.

Seed data or initial setup scripts can be added to MongoDB using tools like Compass or the mongo shell.

**Troubleshooting**
**Dependency Errors**: Run npm install in both action and backend directories.

**MongoDB Connection Issues**: Ensure the MongoDB service is active and the URI in .env is correct.

**Port Conflicts**: Change PORT in .env for the backend or adjust the React script for the frontend.

Congratulations! The Community-Based Task Management Tool is now running locally. Collaborate, assign tasks, and track progress seamlessly! 🚀

