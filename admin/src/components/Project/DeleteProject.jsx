import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DeleteProject.css';

const ProjectList = ({ token }) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState('');

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
                setProjects(projects.filter((p) => p._id !== projectId));
            } catch (err) {
                setError(err.response?.data?.message || 'Error deleting project');
            }
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [token]);

    return (
        <div className="project-list-container">
            <h2 className="project-list-title">All Projects</h2>
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
