# Project Management API

This is a Node.js/Express backend for managing projects, including secure file uploads for project images and resumes. The API is protected with authentication and admin-only access for sensitive routes.

## Features

- **Project CRUD**: Create, read, update, and delete projects.
- **Image Upload**: Upload project images (protected, admin only).
- **Resume Upload**: Upload PDF resumes (protected, admin only).
- **Static File Serving**: Publicly serve uploaded images and resumes with CORS enabled.
- **Authentication**: JWT-based authentication with admin-only middleware.
- **Security**: Uses Helmet, CORS, and rate limiting.
- **Logging**: Uses Morgan for request logging.
- **MongoDB**: Stores project data using Mongoose.

## Folder Structure

```
uploads/
  projects/    # Project images
  resumes/     # PDF resumes (.gitkeep included for git tracking)
routes/
  upload.routes.js
  project.routes.js
controllers/
  project.controller.js
middleware/
  auth.middleware.js
  adminOnly.js
config/
  admin.setup.js
server.js
README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/login` – Login and receive JWT

### Projects

- `GET /api/projects` – List all projects
- `POST /api/projects` – Create a project (admin only)
- `PUT /api/projects/:id` – Update a project (admin only)
- `DELETE /api/projects/:id` – Delete a project and its image (admin only)

### File Uploads

- `POST /api/uploads/projects` – Upload a project image (`image` field, admin only)
- `POST /api/uploads/resumes` – Upload a resume PDF (`resume` field, admin only)

### Static File Access

- `GET /api/uploads/projects/:filename` – Access a project image
- `GET /api/uploads/resumes/:filename` – Access a resume PDF

## Usage

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Set up environment variables**
   - Create a `.env` file with your MongoDB URI and JWT secret.

3. **Run the server**
   ```sh
   npm start
   ```

4. **Upload files**
   - Use a frontend or tools like Postman/cURL to upload images and resumes.

5. **Access files**
   - Images: `http://localhost:5000/api/uploads/projects/yourimage.jpg`
   - Resumes: `http://localhost:5000/api/uploads/resumes/yourresume.pdf`

## Notes

- Only admins can upload or delete files.
- The `uploads/resumes/.gitkeep` file ensures the resumes folder is tracked by git.
- Make sure the `uploads/projects` and `uploads/resumes` folders exist (created automatically if missing).

---

**Feel free to contribute or open issues!**