import { useState } from 'react';
import axios from 'axios';
import "./AddProject.css";

const AddResume = ({ token }) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                setError('Only PDF files are allowed.');
                setFile(null);
                return;
            }
            setFile(selectedFile);
            setError('');
        } else {
            setError('Please select a file to upload.');
        }
    };

    const addProject = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        try {
            await axios.post(`${apiBaseUrl}/api/pdf/resume`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Resume uploaded successfully!');
            setError('');
            setFile(null);
            e.target.reset();
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Failed to upload file. Please try again.');
            } else {
                setError('Failed to upload file. Please try again.');
            }
        }
    };

    return (
        <div className="form-section">
            <h1>Let's Add Resume</h1>
            <form onSubmit={addProject}>
                <div className="form-row">
                    <label>Upload Resume:</label>
                    <input type="file" name="resume" accept="application/pdf" required onChange={handleFileChange} />
                </div>
                <button className='button' type="submit">Add Resume</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AddResume;
