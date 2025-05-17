import React from 'react';
import AddProject from './Project/AddProject';
import DeleteProject from './Project/DeleteProject';
import Navbar from './NavBar/Navbar'; 
import './Dashboard.css';
import AddResume from './Project/AddResume';

const Dashboard = ({ token, onLogout }) => {
    return (
        <div className="dashboard-container">
            <Navbar onLogout={onLogout} />
            <div className="dashboard-content">
                <AddProject token={token} />
                <AddResume token={token} />
                <DeleteProject token={token} />
            </div>
        </div>
    );
};

export default Dashboard;
