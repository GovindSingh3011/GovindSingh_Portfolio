import { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddProject.css";

const AddProject = ({ token }) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    isBlog: false,
    ghLink: '',
    demoLink: '',
    category: '',
  });
  const [customCategory, setCustomCategory] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/projects`);
      setProjects(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
    }
  };

  const categories = [
    ...new Set(projects.map((project) => project.category)),
    'Other',
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a file to upload.');
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${apiBaseUrl}/api/uploads/projects`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('File uploaded successfully:', response.data);
        setError('');
        setFile(null);
        document.querySelector('input[type="file"]').value = '';
      }
    } catch (err) {
      setError('Failed to upload file. Please try again.');
      console.error(err);
    }
  };

  const addProject = async (e) => {
    e.preventDefault();

    await handleFileUpload();

    const finalCategory = newProject.category === 'Other' ? customCategory : newProject.category;

    try {
      const response = await axios.post(`${apiBaseUrl}/api/projects`, {
        ...newProject,
        category: finalCategory,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects([response.data.data, ...projects]);
      setNewProject({
        title: '',
        description: '',
        isBlog: false,
        ghLink: '',
        demoLink: '',
        category: '',
      });
      setCustomCategory('');
      setFile(null);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Failed to add project');
      } else {
        setError(err.message || 'An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]);

  return (
    <div className="form-section">
      <h1>Let's Add Projects</h1>

      <form onSubmit={addProject}>
        <div className="form-row">
          <input
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            required
          />
        </div>

        <div className="form-row">
          <select
            value={newProject.category}
            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
            required
            className="form-select select"
          >
            <option value="" disabled hidden>Choose Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {newProject.category === 'Other' && (
            <input
              type="text"
              placeholder="Enter category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              required
              className="custom-category"
            />
          )}
        </div>

        <div className="form-row">
          <label>Upload Image:</label>
          <input type="file" accept="image/png" required onChange={handleFileChange} />

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="isBlog"
              checked={newProject.isBlog}
              onChange={(e) => setNewProject({ ...newProject, isBlog: e.target.checked })}
            />
            <label htmlFor="isBlog">Is Blog</label>
          </div>
        </div>

        <div className="form-row">
          <input
            type="text"
            placeholder="GitHub Link"
            value={newProject.ghLink}
            onChange={(e) => setNewProject({ ...newProject, ghLink: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Demo Link"
            value={newProject.demoLink}
            onChange={(e) => setNewProject({ ...newProject, demoLink: e.target.value })}
          />
        </div>

        <div className="form-row">
          <textarea
            value={newProject.description}
            placeholder="Project Description"
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            required
          />
        </div>

        <button className='button' type="submit">Add Project</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>

  );
};

export default AddProject;
