import React from 'react';
import AddProject from './Project/AddProject';
import DeleteProject from './Project/DeleteProject';
import Navbar from './NavBar/Navbar'; 
import './Dashboard.css';
import AddResume from './Project/AddResume';

// import AddProject from './Project/c'; // Assuming 'c' is a component you want to include

const Dashboard = ({ token, onLogout }) => {
    return (
        <div className="dashboard-container">
            <Navbar onLogout={onLogout} />
            <div className="dashboard-content">
                <AddResume token={token} />
                <AddProject token={token} />
                <DeleteProject token={token} />
                {/* <AddProject token={token} /> */}
            </div>
        </div>
    );
};

export default Dashboard;
