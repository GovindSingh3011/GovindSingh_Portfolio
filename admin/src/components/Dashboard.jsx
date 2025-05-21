import React from 'react';
import AddProject from './Project/AddProject';
import DeleteProject from './Project/DeleteProject';
import Navbar from './NavBar/Navbar'; 
import './Dashboard.css';
import AddResume from './Project/AddResume';
import AddCertificate from './Project/AddCertificate';
import DeleteCertificate from './Project/DeleteCertificate';

const Dashboard = ({ token, onLogout }) => {
    return (
        <div className="dashboard-container">
            <Navbar onLogout={onLogout} />
            <div className="dashboard-content">
                <AddProject token={token} />
                <AddCertificate token={token} />
                <AddResume token={token} />
                <DeleteCertificate token={token} />
                <DeleteProject token={token} />
            </div>
        </div>
    );
};

export default Dashboard;
