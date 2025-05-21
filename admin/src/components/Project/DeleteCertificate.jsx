import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DeleteProject.css';

const CertificateList = ({ token }) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const [Certificates, setCertificates] = useState([]);
    const [error, setError] = useState('');

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
                setCertificates(Certificates.filter((c) => c._id !== CertificateId));
            } catch (err) {
                setError(err.response?.data?.message || 'Error deleting Certificate');
            }
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, [token]);

    return (
        <div className="project-list-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2 className="project-list-title">All Certificates</h2>
            {error && <p className="error-message">{error}</p>}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "24px",
                    justifyContent: "center",
                    width: "100%"
                }}
            >
                {Certificates.map((Certificate) => (
                    <div
                        key={Certificate._id}
                        className="project-item"
                        style={{
                            flex: "1 1 45%",
                            minWidth: "300px",
                            maxWidth: "48%",
                            boxSizing: "border-box",
                            margin: "0 auto"
                        }}
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
