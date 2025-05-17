const User = require('../models/user.model');

// Create admin user if it doesn't exist
exports.verifyAdminExists = async () => {
  try {
    // Check if admin exists
    const adminExists = await User.findOne({ username: process.env.ADMIN_USERNAME });
    
    // If admin doesn't exist, create it
    if (!adminExists) {
      console.log('Admin user not found, creating...');
      
      await User.create({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
        isAdmin: true
      });
      
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (err) {
    console.error('Error setting up admin user:', err);
  }
};