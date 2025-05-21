import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DeleteProject.css';
import { FiRefreshCw } from "react-icons/fi";

const CertificateList = ({ token }) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const [Certificates, setCertificates] = useState([]);
    const [error, setError] = useState('');
    const [refresh, setRefresh] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);

    const fetchCertificates = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/pdf/certificate`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const sorted = [...(response.data.data || [])].sort((a, b) => b._id.localeCompare(a._id));
            setCertificates(sorted);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching Certificates');
        }
    };

    const handleDelete = async (CertificateId) => {
        if (window.confirm('Are you sure you want to delete this certificate?')) {
            try {
                await axios.delete(`${apiBaseUrl}/api/pdf/certificate/${CertificateId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRefresh(r => r + 1);
            } catch (err) {
                setError(err.response?.data?.message || 'Error deleting Certificate');
            }
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, [token, refresh]);

    return (
        <div className="project-list-container flex-center-col">
            <div className="project-list-header">
                <h2 className="project-list-title center-text">All Certificates</h2>
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
            <div className="project-list-flex">
                {Certificates.map((Certificate) => (
                    <div
                        key={Certificate._id}
                        className="project-item project-item-flex"
                    >
                        <div className="project-info">
                            <h3>{Certificate.name}</h3>
                            <p>{Certificate.organization}</p>
                        </div>
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(Certificate._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CertificateList;
