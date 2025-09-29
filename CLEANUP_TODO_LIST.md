# 🧹 Cleanup Todo List: Keep Only Planets & Satellites

## 🎯 **Goal**: Remove all non-Shneta test features, keep only Planets & Satellites

---

## 📋 **Database Cleanup**

### ✅ **Keep These Tables:**
- `Planet212299999` ✅
- `Satellite212299999` ✅

### ❌ **Delete These Tables (Step by Step):**

#### **Step 1: Connect to Database**
```sql
-- Connect to your MySQL database using your preferred method:
-- - MySQL Workbench
-- - phpMyAdmin  
-- - Command line: mysql -u [username] -p [database_name]
```

#### **Step 2: Check Current Tables**
```sql
-- First, see what tables exist:
SHOW TABLES;

-- You should see tables like:
-- authors, books, students, courses, doctors, appointments, movies, actors, teachers, subjects, stores, products, flights, passengers, libraries, library_books, teams, players, lecturers, lectures, employees, contracts
-- Planet212299999, Satellite212299999
-- [plus your original Shneta tables]
```

#### **Step 3: Delete Test Tables (One by One)**
```sql
-- Delete in this order (respecting foreign key constraints):

-- 1. Delete library_books first (has foreign key to libraries)
DROP TABLE IF EXISTS library_books;

-- 2. Delete libraries (no dependencies)
DROP TABLE IF EXISTS libraries;

-- 3. Delete passengers first (has foreign key to flights)
DROP TABLE IF EXISTS passengers;

-- 4. Delete flights (no dependencies)
DROP TABLE IF EXISTS flights;

-- 5. Delete products first (has foreign key to stores)
DROP TABLE IF EXISTS products;

-- 6. Delete stores (no dependencies)
DROP TABLE IF EXISTS stores;

-- 7. Delete actors first (has foreign key to movies)
DROP TABLE IF EXISTS actors;

-- 8. Delete movies (no dependencies)
DROP TABLE IF EXISTS movies;

-- 9. Delete subjects first (has foreign key to teachers)
DROP TABLE IF EXISTS subjects;

-- 10. Delete teachers (no dependencies)
DROP TABLE IF EXISTS teachers;

-- 11. Delete appointments first (has foreign key to doctors)
DROP TABLE IF EXISTS appointments;

-- 12. Delete doctors (no dependencies)
DROP TABLE IF EXISTS doctors;

-- 13. Delete courses first (has foreign key to students)
DROP TABLE IF EXISTS courses;

-- 14. Delete students (no dependencies)
DROP TABLE IF EXISTS students;

-- 15. Delete books first (has foreign key to authors)
DROP TABLE IF EXISTS books;

-- 16. Delete authors (no dependencies)
DROP TABLE IF EXISTS authors;

-- 17. Delete players first (has foreign key to teams)
DROP TABLE IF EXISTS players;

-- 18. Delete teams (no dependencies)
DROP TABLE IF EXISTS teams;

-- 19. Delete lectures first (has foreign key to lecturers)
DROP TABLE IF EXISTS lectures;

-- 20. Delete lecturers (no dependencies)
DROP TABLE IF EXISTS lecturers;

-- 21. Delete contracts first (has foreign key to employees)
DROP TABLE IF EXISTS contracts;

-- 22. Delete employees (no dependencies)
DROP TABLE IF EXISTS employees;
```

#### **Step 4: Verify Deletion**
```sql
-- Check that only the correct tables remain:
SHOW TABLES;

-- You should see:
-- ✅ Planet212299999
-- ✅ Satellite212299999
-- ✅ [All your original Shneta business tables]
-- ❌ NO authors, books, students, courses, doctors, appointments, movies, actors, teachers, subjects, stores, products, flights, passengers, libraries, library_books, teams, players, lecturers, lectures, employees, contracts
```

#### **Step 5: Check Table Structures**
```sql
-- Verify the planet and satellite tables have correct structure:
DESCRIBE Planet212299999;
DESCRIBE Satellite212299999;

-- Both should have:
-- - Primary key (PlanetId/SatelliteId)
-- - Name field
-- - Type field (for planets)
-- - IsDeleted field
-- - CreatedAt and UpdatedAt timestamps
-- - Foreign key relationship (Satellite -> Planet)
```

#### **Step 6: Test Data Integrity**
```sql
-- Check if there's any sample data:
SELECT * FROM Planet212299999;
SELECT * FROM Satellite212299999;

-- If you want to keep sample data, leave it
-- If you want to clean it up:
-- DELETE FROM Satellite212299999;
-- DELETE FROM Planet212299999;
```

### ⚠️ **Important Database Notes:**
1. **Backup First**: Always backup your database before making changes
2. **Foreign Key Order**: Delete child tables before parent tables
3. **Test After Each Step**: Don't delete everything at once
4. **Keep Original Data**: Don't touch your main Shneta business tables
5. **Verify Results**: Always check what tables remain after deletion

---

## 🗂️ **Backend Cleanup**

### ❌ **Delete These Model Files:**
- [ ] `src/server/models/Authors.js`
- [ ] `src/server/models/Books.js`
- [ ] `src/server/models/Students.js`
- [ ] `src/server/models/Courses.js`
- [ ] `src/server/models/Doctors.js`
- [ ] `src/server/models/Appointments.js`
- [ ] `src/server/models/Movies.js`
- [ ] `src/server/models/Actors.js`
- [ ] `src/server/models/Teachers.js`
- [ ] `src/server/models/Subjects.js`
- [ ] `src/server/models/Stores.js`
- [ ] `src/server/models/Products.js`
- [ ] `src/server/models/Flights.js`
- [ ] `src/server/models/Passengers.js`
- [ ] `src/server/models/Libraries.js`
- [ ] `src/server/models/LibraryBooks.js`
- [ ] `src/server/models/Team.js`
- [ ] `src/server/models/Player.js`
- [ ] `src/server/models/Lecturer.js`
- [ ] `src/server/models/Lecture.js`
- [ ] `src/server/models/Employee.js`
- [ ] `src/server/models/Contract.js`

### ❌ **Delete These Route Files:**
- [ ] `src/server/routes/authorsRoutes.js`
- [ ] `src/server/routes/booksRoutes.js`
- [ ] `src/server/routes/studentsRoutes.js`
- [ ] `src/server/routes/coursesRoutes.js`
- [ ] `src/server/routes/doctorsRoutes.js`
- [ ] `src/server/routes/appointmentsRoutes.js`
- [ ] `src/server/routes/moviesRoutes.js`
- [ ] `src/server/routes/actorsRoutes.js`
- [ ] `src/server/routes/teachersRoutes.js`
- [ ] `src/server/routes/subjectsRoutes.js`
- [ ] `src/server/routes/storesRoutes.js`
- [ ] `src/server/routes/productsRoutes.js`
- [ ] `src/server/routes/flightsRoutes.js`
- [ ] `src/server/routes/passengersRoutes.js`
- [ ] `src/server/routes/librariesRoutes.js`
- [ ] `src/server/routes/libraryBooksRoutes.js`
- [ ] `src/server/routes/teamRoutes.js`
- [ ] `src/server/routes/playerRoutes.js`
- [ ] `src/server/routes/lecturerRoutes.js`
- [ ] `src/server/routes/lectureRoutes.js`
- [ ] `src/server/routes/employeeRoutes.js`
- [ ] `src/server/routes/contractRoutes.js`

### 🔧 **Update These Files:**
- [ ] **`Server.js`** - Remove all non-planet/satellite route imports and usage
- [ ] **`src/server/models/index.js`** - Remove all non-planet/satellite model imports and exports

---

## 🎨 **Frontend Cleanup**

### ❌ **Delete These Component Files:**
- [ ] `src/client/pages/AuthorsManagement.jsx`
- [ ] `src/client/pages/BooksManagement.jsx`
- [ ] `src/client/pages/StudentsManagement.jsx`
- [ ] `src/client/pages/CoursesManagement.jsx`
- [ ] `src/client/pages/DoctorsManagement.jsx`
- [ ] `src/client/pages/AppointmentsManagement.jsx`
- [ ] `src/client/pages/MoviesManagement.jsx`
- [ ] `src/client/pages/ActorsManagement.jsx`
- [ ] `src/client/pages/TeachersManagement.jsx`
- [ ] `src/client/pages/SubjectsManagement.jsx`
- [ ] `src/client/pages/StoresManagement.jsx`
- [ ] `src/client/pages/ProductsManagement.jsx`
- [ ] `src/client/pages/FlightsManagement.jsx`
- [ ] `src/client/pages/PassengersManagement.jsx`
- [ ] `src/client/pages/LibrariesManagement.jsx`
- [ ] `src/client/pages/LibraryBooksManagement.jsx`
- [ ] `src/client/pages/Teams.jsx`
- [ ] `src/client/pages/Players.jsx`
- [ ] `src/client/pages/Lecturers.jsx`
- [ ] `src/client/pages/Lectures.jsx`
- [ ] `src/client/pages/Employees.jsx`
- [ ] `src/client/pages/Contracts.jsx`

### 🔧 **Update These Files:**
- [ ] **`src/client/App.jsx`** - Remove all non-planet/satellite routes
- [ ] **`src/client/pages/AppPages/AdminPages.jsx`** - Remove all non-planet/satellite imports and switch cases
- [ ] **`src/client/admin/AdminNavbar.jsx`** - Remove all non-planet/satellite navigation links
- [ ] **`src/client/utils/api.js`** - Remove all non-planet/satellite API objects

---

## 🗃️ **Database Files Cleanup**

### ❌ **Delete These SQL Files:**
- [ ] `current_database/team_player_tables.sql`
- [ ] `current_database/lecturer_lecture_tables.sql`
- [ ] `current_database/employee_contract_tables.sql`
- [ ] `current_database/planet_satellite_tables.sql` (if it exists separately)
- [ ] `current_database/student_course_tables.sql` (if it exists separately)
- [ ] `current_database/doctor_appointment_tables.sql` (if it exists separately)

### ✅ **Keep These Files:**
- [ ] `current_database/database_restructure.sql` ✅ (main database structure)

---

## 📄 **Documentation Cleanup**

### ❌ **Delete These Documentation Files:**
- [ ] `TEAM_PLAYER_IMPLEMENTATION.md`
- [ ] `LECTURER_LECTURE_IMPLEMENTATION.md`
- [ ] `EMPLOYEE_CONTRACT_IMPLEMENTATION.md`
- [ ] `TESTING_INSTRUCTIONS.md`

---

## 🧹 **Final Cleanup Steps**

### 🔍 **Search and Remove:**
- [ ] Search for any remaining references to "authors", "books", "teams", "players", "lecturers", "lectures", "employees", "contracts"
- [ ] Remove any unused imports
- [ ] Clean up any leftover navigation links
- [ ] Remove any unused API endpoints

### ✅ **Verify Final State:**
- [ ] Only Planets and Satellites functionality remains
- [ ] All navigation links point to valid pages
- [ ] No broken imports or references
- [ ] Database only contains planet/satellite tables
- [ ] Clean, professional codebase

---

## 🎯 **Expected Final Admin Navigation:**
```
Dashboard
Planets
Satellites
[Original Shneta features only]
```

---

## ⚠️ **Important Notes:**
1. **Backup first** - Make sure you have a backup before deleting anything
2. **Test after each section** - Don't delete everything at once
3. **Keep original Shneta features** - Don't touch the main business functionality
4. **Database last** - Delete database tables only after confirming everything else works

---

## 🚀 **Result:**
A clean, professional codebase with only:
- ✅ Original Shneta business functionality
- ✅ Planets & Satellites management
- ❌ No test features or suspicious code
