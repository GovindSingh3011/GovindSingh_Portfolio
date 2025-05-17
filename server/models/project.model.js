const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
  },
  isBlog: {
    type: Boolean,
    default: false
  },
  ghLink: {
    type: String
  },
  demoLink: {
    type: String
  },
  category: {
    type: String,
    required: [true, 'Project category is required']
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Project', ProjectSchema);