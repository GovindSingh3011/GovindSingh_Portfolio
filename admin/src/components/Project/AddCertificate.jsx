import { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddProject.css";

const AddCertificate = ({ token }) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const [newCertificate, setNewCertificate] = useState({
        name: '',
        organization: '',
        dateCompleted: ''
    });
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);

    const addCertificate = async (e) => {
        e.preventDefault();
        setError('');
        if (!file) {
            setError("Please upload a certificate PDF.");
            return;
        }
        const formData = new FormData();
        formData.append("name", newCertificate.name);
        formData.append("organization", newCertificate.organization);
        formData.append("dateCompleted", newCertificate.dateCompleted);
        formData.append("file", file);

        try {
            await axios.post(
                `${apiBaseUrl}/api/pdf/certificate`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setNewCertificate({
                name: '',
                organization: '',
                dateCompleted: '',
                url: ''
            });
            setFile(null);
            setError('');
            e.target.reset();
            alert("Certificate added successfully!");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to add certificate. Please try again."
            );
        }
    };

    return (
        <div className="form-section">
            <h1>Let's Add Certificates</h1>

            <form onSubmit={addCertificate}>
                <div className="form-row">
                    <input
                        type="text"
                        placeholder="Certificate Name"
                        value={newCertificate.name}
                        onChange={e =>
                            setNewCertificate({ ...newCertificate, name: e.target.value })
                        }
                        required
                    />
                </div>

                
                <div className="form-row">
                    <div style={{ width: "50%" }}>
                        <input
                        type="text"
                        placeholder="Organization"
                        value={newCertificate.organization}
                        onChange={e =>
                            setNewCertificate({ ...newCertificate, organization: e.target.value })
                        }
                        required
                    />
                    </div>

                    <label>Date Completed:</label>
                    <div
                        style={{ width: "25%" }}
                        onClick={e => {
                            const input = e.currentTarget.querySelector("input[type='month']");
                            if (input) input.showPicker ? input.showPicker() : input.focus();
                        }}
                    >
                        <input
                            type="month"
                            value={newCertificate.dateCompleted}
                            onChange={e =>
                                setNewCertificate({ ...newCertificate, dateCompleted: e.target.value })
                            }
                            required
                            onFocus={e => e.target.showPicker && e.target.showPicker()}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <label>Upload Certificate:</label>
                    <input
                        type="file"
                        accept="application/pdf"
                        required
                        onChange={e => setFile(e.target.files[0])}
                    />
                </div>

                <button className='button' type="submit">Add Certificate</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AddCertificate;
