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
        e.preventDefault(); // Prevent default form submission behavior

        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        const renamedFile = new File([file], 'Govind_Singh_Resume.pdf', { type: file.type }); // Rename the file to GSResume.pdf
        formData.append('resume', renamedFile); // Use 'resume' as the field name to match the backend's expectation

        try {
            console.log('Uploading file:', renamedFile); // Debugging: Log the file being uploaded
            const response = await axios.post(`${apiBaseUrl}/api/uploads/resumes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log('File uploaded successfully:', response.data);
                setError('');
                setFile(null);
                document.querySelector('input[type="file"]').value = ''; // Reset the file input
            }
        } catch (err) {
            if (err.response) {
                console.error('Error response from server:', err.response.data); // Debugging: Log server response
                setError(err.response.data.message || 'Failed to upload file. Please try again.');
            } else {
                console.error('Error uploading file:', err.message); // Debugging: Log client-side error
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
