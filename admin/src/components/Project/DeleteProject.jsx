import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DeleteProject.css';
import { FiRefreshCw } from "react-icons/fi";

const ProjectList = ({ token }) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState('');
    const [refresh, setRefresh] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/projects`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProjects(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching projects');
        }
    };

    const handleDelete = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`${apiBaseUrl}/api/projects/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRefresh(r => r + 1);
            } catch (err) {
                setError(err.response?.data?.message || 'Error deleting project');
            }
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [token, refresh]);

    return (
        <div className="project-list-container">
            <div className="project-list-header">
                <h2 className="project-list-title center-text">All Projects</h2>
                <button
                    className={`refresh-btn${isSpinning ? " spinning" : ""}`}
                    title="Refresh"
                    onClick={() => {
                        setIsSpinning(true);
                        setRefresh(r => r + 1);
                        setTimeout(() => setIsSpinning(false), 800);
                    }}
                >
                    <FiRefreshCw size={24} color="#a78bfa" />
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <ul className="project-list">
                {projects.map((project) => (
                    <li key={project._id} className="project-item">
                        <div className="project-info">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                        </div>
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(project._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
