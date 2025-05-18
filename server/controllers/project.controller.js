const Project = require('../models/project.model');
const cloudinary = require("cloudinary").v2;

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Admin
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      isBlog,
      ghLink,
      demoLink,
      category,
      imageUrl
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !imageUrl) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Create project
    const project = await Project.create(req.body);
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (err) {
    console.error(err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error creating project'
    });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }); // Sort by createdAt descending
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving projects'
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = async (req, res) => {
  try {
    // Find project by ID
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    console.error(err);
    
    // Handle invalid ObjectId
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Project not found with that ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error retrieving project'
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
exports.updateProject = async (req, res) => {
  try {
    // Find and update project
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    console.error(err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    // Handle invalid ObjectId
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Project not found with that ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error updating project'
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
exports.deleteProject = async (req, res) => {
  try {
    // Find project by ID
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Delete image from Cloudinary if imageUrl exists
    if (project.imageUrl) {
      try {
        // Extract public_id from imageUrl
        // Example: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/projects/<public_id>.<ext>
        const matches = project.imageUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+(?:\?.*)?$/);
        let publicId = matches ? matches[1] : null;

        if (publicId) {
          console.log("Deleting Cloudinary image with public_id:", publicId);
          // Try deleting as image first, then as raw
          let result = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
          console.log("Cloudinary destroy result:", result);
          if (result.result !== "ok" && result.result !== "not found") {
            result = await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
            console.log("Cloudinary destroy (raw) result:", result);
          }
        } else {
          console.warn("Could not extract public_id from imageUrl:", project.imageUrl);
        }
      } catch (cloudErr) {
        console.error("Cloudinary image delete error:", cloudErr);
        // Continue even if image deletion fails
      }
    }

    // Delete project from DB
    await project.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error(err);
    
    // Handle invalid ObjectId
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Project not found with that ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error deleting project'
    });
  }
};