const express = require('express');
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} = require('../controllers/project.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');

const router = express.Router();

// Routes for /api/projects
router
  .route('/')
  .get(getProjects)
  .post(protect, adminOnly, createProject);

// Routes for /api/projects/:id
router
  .route('/:id')
  .get(getProject)
  .put(protect, adminOnly, updateProject)
  .delete(protect, adminOnly, deleteProject);

module.exports = router;