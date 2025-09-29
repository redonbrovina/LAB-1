# Lecturer and Lecture Management System Implementation

## Overview
This implementation provides a complete CRUD system for managing Lecturers and Lectures as specified in the assignment. The system includes both backend API endpoints and frontend management interfaces.

## Database Structure

### Lecturers Table
- `LecturerID` (INT, Primary Key, Auto Increment)
- `LecturerName` (VARCHAR(255), Not Null)
- `Department` (VARCHAR(255), Not Null)
- `Email` (VARCHAR(255), Not Null, Email Validation)

### Lectures Table
- `LectureID` (INT, Primary Key, Auto Increment)
- `LectureName` (VARCHAR(255), Not Null)
- `LecturerID` (INT, Foreign Key to Lecturers.LecturerID)

## Backend Implementation

### Models
- `src/server/models/Lecturer.js` - Lecturer model with associations
- `src/server/models/Lecture.js` - Lecture model with lecturer relationship

### Controllers
- `src/server/controllers/LecturerController.js` - Lecturer CRUD operations
- `src/server/controllers/LectureController.js` - Lecture CRUD operations

### Repositories
- `src/server/repositories/LecturerRepository.js` - Lecturer data access layer
- `src/server/repositories/LectureRepository.js` - Lecture data access layer

### Routes
- `src/server/routes/lecturerRoutes.js` - Lecturer API endpoints
- `src/server/routes/lectureRoutes.js` - Lecture API endpoints

### API Endpoints

#### Lecturers
- `GET /api/lecturers` - Get all lecturers
- `GET /api/lecturers/:id` - Get lecturer by ID
- `POST /api/lecturers` - Create new lecturer
- `PUT /api/lecturers/:id` - Update lecturer
- `DELETE /api/lecturers/:id` - Delete lecturer

#### Lectures
- `GET /api/lectures` - Get all lectures
- `GET /api/lectures/:id` - Get lecture by ID
- `GET /api/lectures/lecturer/:lecturerId` - Get lectures by lecturer
- `POST /api/lectures` - Create new lecture
- `PUT /api/lectures/:id` - Update lecture
- `DELETE /api/lectures/:id` - Delete lecture

## Frontend Implementation

### Pages
- `src/client/pages/Lecturers.jsx` - Lecturer management interface
- `src/client/pages/Lectures.jsx` - Lecture management interface

### Features
- **Lecturers Management:**
  - View all lecturers in a table
  - Add new lecturers
  - Edit existing lecturers (with pre-populated forms)
  - Delete lecturers
  - Show lecture count for each lecturer
  - Modal-based forms

- **Lectures Management:**
  - View all lectures with lecturer information
  - Add new lectures with lecturer dropdown selection
  - Edit existing lectures
  - Delete lectures (with delete button in list)
  - Lecturer dropdown for lecture selection

### Navigation
- Added "Lecturers" and "Lectures" links to the admin navigation
- Routes configured in App.jsx for `/admin/lecturers` and `/admin/lectures`

## Sample Data
The system includes sample data:

### Lecturers
1. Dr. John Smith (Computer Science, john.smith@university.edu)
2. Prof. Sarah Johnson (Mathematics, sarah.johnson@university.edu)
3. Dr. Michael Brown (Physics, michael.brown@university.edu)
4. Prof. Emily Davis (Chemistry, emily.davis@university.edu)

### Lectures
1. Introduction to Programming (Dr. John Smith)
2. Data Structures and Algorithms (Dr. John Smith)
3. Calculus I (Prof. Sarah Johnson)
4. Linear Algebra (Prof. Sarah Johnson)
5. Quantum Mechanics (Dr. Michael Brown)
6. Thermodynamics (Dr. Michael Brown)
7. Organic Chemistry (Prof. Emily Davis)
8. Physical Chemistry (Prof. Emily Davis)

## Assignment Requirements Fulfilled

### 1. Create Tables in Database (Backend) - 20% ✅
- Created `lecturers` and `lectures` tables
- Implemented one-to-many relationship between Lecturer and Lecture
- Each Lecture has a foreign key (`LecturerID`) referencing Lecturer

### 2. Insert Data into Tables (Frontend & Backend) - 20% ✅
- Implemented code to insert data into `lecturers` table
- Implemented code to insert data into `lectures` table
- Lecturer selection via dropdown menu when creating lectures
- Sample data included

### 3. Display All Lecturers and Their Lectures (Frontend & Backend) - 20% ✅
- Implemented code to display all lecturers and their lectures
- List format showing lecturer information and associated lectures
- Clean, organized display

### 4. Update Lecturer Data (Frontend & Backend) - 20% ✅
- Implemented code to update lecturer data
- All fields in update form are pre-filled with current lecturer data
- Backend API endpoint for lecturer updates

### 5. Delete Selected Lecture (Frontend & Backend) - 20% ✅
- Implemented code to delete lectures
- Delete button in the list of lectures
- Confirmation dialog for deletion
- Backend API endpoint for lecture deletion

## How to Use

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Access the admin panel:**
   - Navigate to `/admin` in your browser
   - Login with admin credentials

3. **Manage Lecturers:**
   - Click "Lecturers" in the admin navigation
   - Add, edit, or delete lecturers as needed

4. **Manage Lectures:**
   - Click "Lectures" in the admin navigation
   - Add, edit, or delete lectures
   - Use the lecturer dropdown when adding/editing lectures

## Technical Notes
- Uses Sequelize ORM for database operations
- Implements proper error handling
- Includes form validation
- Responsive design with Tailwind CSS
- Modal-based forms for better UX
- Confirmation dialogs for delete operations
- Pre-populated forms for editing
- Lecturer dropdown for lecture selection
- Admin authentication required for all operations

## Grade Requirements

### For Grade 6:
✅ **Lecturer CRUD Operations Only**
- Create Lecturer
- Read All Lecturers
- Update Lecturer
- Delete Lecturer

### For Project Grade:
✅ **Complete Implementation**
- All Lecturer CRUD operations
- All Lecture CRUD operations
- Lecturer dropdown in lecture creation
- Pre-populated edit forms
- Delete buttons in lecture list
- Display all lecturers and their lectures

The system is now fully functional and ready for use!
