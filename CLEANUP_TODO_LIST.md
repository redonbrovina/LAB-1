# 🧹 Cleanup Todo List: Remove All Test Management Systems

## 🎯 **Goal**: Remove all test management systems, keep only your original Shneta functionality

## 📝 **What This List Contains:**
This cleanup list includes ALL the management systems we created during development. You can use this as a reference to:
- **Keep only what you need** for your actual task
- **Remove everything else** to have a clean codebase
- **See exactly what was added** so you can decide what to keep

## 🎯 **Management Systems Created (Choose What to Keep):**
1. **Students & Courses** - Student(StudentId, Name, Surname, YearOfStudy) + Course(CourseId, Title, Credits, StudentId)
2. **Doctors & Appointments** - Doctor(DoctorId, Name, Specialization) + Appointment(AppointmentId, PatientName, Date, DoctorId)
3. **Movies & Actors** - Movie(MovieId, Title, Year, Genre) + Actor(ActorId, Name, BirthYear, MovieId)
4. **Teachers & Subjects** - Teacher(TeacherId, Name, Email) + Subject(SubjectId, Title, Credits, TeacherId)
5. **Stores & Products** - Store(StoreId, StoreName, Location) + Product(ProductId, ProductName, Price, StoreId)
6. **Flights & Passengers** - Flight(FlightId, FlightNumber, Destination, Date) + Passenger(PassengerId, Name, TicketNumber, FlightId)
7. **Libraries & Books** - Library(LibraryId, Name, City) + Book(BookId, Title, Author, LibraryId)
8. **Hotels & Rooms** - Hotel(HotelId, Name, Location) + Room(RoomId, RoomNumber, Capacity, HotelId)
9. **Planets & Satellites** - Planet(PlanetId, Name, Type) + Satellite(SatelliteId, Name, PlanetId)
10. **Teams & Players** - Team(TeamId, Name, City) + Player(PlayerId, Name, Position, TeamId)
11. **Lecturers & Lectures** - Lecturer(LecturerId, Name, Department) + Lecture(LectureId, Title, Credits, LecturerId)
12. **Employees & Contracts** - Employee(EmployeeId, Name, Position) + Contract(ContractId, StartDate, EndDate, EmployeeId)
13. **Authors & Books** - Author(AuthorId, Name, BirthYear) + Book(BookId, Title, AuthorId)

---

## 📋 **Database Cleanup**

### ✅ **Keep These Tables (Your Original Shneta Tables):**
- All your original business tables ✅
- Only keep the management system tables you actually need for your task

### ❌ **Delete These Tables (Step by Step - Choose What to Remove):**

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
-- students, courses, doctors, appointments, movies, actors, teachers, subjects, stores, products, flights, passengers, libraries, books, teams, players, lecturers, lectures, employees, contracts, authors
-- [plus your original Shneta business tables]
```

#### **Step 3: Delete Test Tables (One by One)**
```sql
-- Delete in this order (respecting foreign key constraints):

-- 1. Delete books first (has foreign key to libraries)
DROP TABLE IF EXISTS books;

-- 2. Delete libraries (no dependencies)
DROP TABLE IF EXISTS libraries;

-- 3. Delete rooms first (has foreign key to hotels)
DROP TABLE IF EXISTS rooms;

-- 4. Delete hotels (no dependencies)
DROP TABLE IF EXISTS hotels;

-- 5. Delete passengers first (has foreign key to flights)
DROP TABLE IF EXISTS passengers;

-- 6. Delete flights (no dependencies)
DROP TABLE IF EXISTS flights;

-- 7. Delete products first (has foreign key to stores)
DROP TABLE IF EXISTS products;

-- 8. Delete stores (no dependencies)
DROP TABLE IF EXISTS stores;

-- 9. Delete actors first (has foreign key to movies)
DROP TABLE IF EXISTS actors;

-- 10. Delete movies (no dependencies)
DROP TABLE IF EXISTS movies;

-- 11. Delete subjects first (has foreign key to teachers)
DROP TABLE IF EXISTS subjects;

-- 12. Delete teachers (no dependencies)
DROP TABLE IF EXISTS teachers;

-- 13. Delete appointments first (has foreign key to doctors)
DROP TABLE IF EXISTS appointments;

-- 14. Delete doctors (no dependencies)
DROP TABLE IF EXISTS doctors;

-- 15. Delete courses first (has foreign key to students)
DROP TABLE IF EXISTS courses;

-- 16. Delete students (no dependencies)
DROP TABLE IF EXISTS students;

-- 17. Delete authors (no dependencies)
DROP TABLE IF EXISTS authors;

-- 18. Delete players first (has foreign key to teams)
DROP TABLE IF EXISTS players;

-- 19. Delete teams (no dependencies)
DROP TABLE IF EXISTS teams;

-- 20. Delete lectures first (has foreign key to lecturers)
DROP TABLE IF EXISTS lectures;

-- 21. Delete lecturers (no dependencies)
DROP TABLE IF EXISTS lecturers;

-- 22. Delete contracts first (has foreign key to employees)
DROP TABLE IF EXISTS contracts;

-- 23. Delete employees (no dependencies)
DROP TABLE IF EXISTS employees;
```

#### **Step 4: Verify Deletion**
```sql
-- Check that only the correct tables remain:
SHOW TABLES;

-- You should see:
-- ✅ [All your original Shneta business tables]
-- ✅ [Only the management system tables you decided to keep]
-- ❌ NO test management system tables that you don't need
```

#### **Step 5: Check Table Structures**
```sql
-- Verify the tables you kept have correct structure:
-- Example for any management system you kept:
-- DESCRIBE students;
-- DESCRIBE courses;

-- Tables should have:
-- - Primary key fields
-- - Required data fields
-- - Foreign key relationships (if applicable)
-- - CreatedAt and UpdatedAt timestamps
```

#### **Step 6: Test Data Integrity**
```sql
-- Check if there's any sample data in the tables you kept:
-- SELECT * FROM students;
-- SELECT * FROM courses;

-- If you want to keep sample data, leave it
-- If you want to clean it up:
-- DELETE FROM [child_table];
-- DELETE FROM [parent_table];
```

### ⚠️ **Important Database Notes:**
1. **Backup First**: Always backup your database before making changes
2. **Foreign Key Order**: Delete child tables before parent tables
3. **Test After Each Step**: Don't delete everything at once
4. **Keep Original Data**: Don't touch your main Shneta business tables
5. **Verify Results**: Always check what tables remain after deletion

---

## 🗂️ **Backend Cleanup**

### ❌ **Delete These Model Files (Choose What to Remove):**
- [ ] `src/server/models/Student.js` (Students & Courses)
- [ ] `src/server/models/Course.js` (Students & Courses)
- [ ] `src/server/models/Doctor.js` (Doctors & Appointments)
- [ ] `src/server/models/Appointment.js` (Doctors & Appointments)
- [ ] `src/server/models/Movie.js` (Movies & Actors)
- [ ] `src/server/models/Actor.js` (Movies & Actors)
- [ ] `src/server/models/Teacher.js` (Teachers & Subjects)
- [ ] `src/server/models/Subject.js` (Teachers & Subjects)
- [ ] `src/server/models/Store.js` (Stores & Products)
- [ ] `src/server/models/Product.js` (Stores & Products)
- [ ] `src/server/models/Flight.js` (Flights & Passengers)
- [ ] `src/server/models/Passenger.js` (Flights & Passengers)
- [ ] `src/server/models/Library.js` (Libraries & Books)
- [ ] `src/server/models/Book.js` (Libraries & Books)
- [ ] `src/server/models/Hotel.js` (Hotels & Rooms)
- [ ] `src/server/models/Room.js` (Hotels & Rooms)
- [ ] `src/server/models/Planet.js` (Planets & Satellites)
- [ ] `src/server/models/Satellite.js` (Planets & Satellites)
- [ ] `src/server/models/Team.js` (Teams & Players)
- [ ] `src/server/models/Player.js` (Teams & Players)
- [ ] `src/server/models/Lecturer.js` (Lecturers & Lectures)
- [ ] `src/server/models/Lecture.js` (Lecturers & Lectures)
- [ ] `src/server/models/Employee.js` (Employees & Contracts)
- [ ] `src/server/models/Contract.js` (Employees & Contracts)

### ❌ **Delete These Route Files (Choose What to Remove):**
- [ ] `src/server/routes/studentsRoutes.js` (Students & Courses)
- [ ] `src/server/routes/coursesRoutes.js` (Students & Courses)
- [ ] `src/server/routes/doctorsRoutes.js` (Doctors & Appointments)
- [ ] `src/server/routes/appointmentsRoutes.js` (Doctors & Appointments)
- [ ] `src/server/routes/moviesRoutes.js` (Movies & Actors)
- [ ] `src/server/routes/actorsRoutes.js` (Movies & Actors)
- [ ] `src/server/routes/teachersRoutes.js` (Teachers & Subjects)
- [ ] `src/server/routes/subjectsRoutes.js` (Teachers & Subjects)
- [ ] `src/server/routes/storesRoutes.js` (Stores & Products)
- [ ] `src/server/routes/productsRoutes.js` (Stores & Products)
- [ ] `src/server/routes/flightsRoutes.js` (Flights & Passengers)
- [ ] `src/server/routes/passengersRoutes.js` (Flights & Passengers)
- [ ] `src/server/routes/librariesRoutes.js` (Libraries & Books)
- [ ] `src/server/routes/booksRoutes.js` (Libraries & Books)
- [ ] `src/server/routes/hotelsRoutes.js` (Hotels & Rooms)
- [ ] `src/server/routes/roomsRoutes.js` (Hotels & Rooms)
- [ ] `src/server/routes/planetsRoutes.js` (Planets & Satellites)
- [ ] `src/server/routes/satellitesRoutes.js` (Planets & Satellites)
- [ ] `src/server/routes/teamRoutes.js` (Teams & Players)
- [ ] `src/server/routes/playerRoutes.js` (Teams & Players)
- [ ] `src/server/routes/lecturerRoutes.js` (Lecturers & Lectures)
- [ ] `src/server/routes/lectureRoutes.js` (Lecturers & Lectures)
- [ ] `src/server/routes/employeeRoutes.js` (Employees & Contracts)
- [ ] `src/server/routes/contractRoutes.js` (Employees & Contracts)

### 🔧 **Update These Files:**
- [ ] **`Server.js`** - Remove route imports and usage for management systems you don't need
- [ ] **`src/server/models/index.js`** - Remove model imports and exports for management systems you don't need

---

## 🎨 **Frontend Cleanup**

### ❌ **Delete These Component Files (Choose What to Remove):**
- [ ] `src/client/pages/StudentsManagement.jsx` (Students & Courses)
- [ ] `src/client/pages/CoursesManagement.jsx` (Students & Courses)
- [ ] `src/client/pages/DoctorsManagement.jsx` (Doctors & Appointments)
- [ ] `src/client/pages/AppointmentsManagement.jsx` (Doctors & Appointments)
- [ ] `src/client/pages/MoviesManagement.jsx` (Movies & Actors)
- [ ] `src/client/pages/ActorsManagement.jsx` (Movies & Actors)
- [ ] `src/client/pages/TeachersManagement.jsx` (Teachers & Subjects)
- [ ] `src/client/pages/SubjectsManagement.jsx` (Teachers & Subjects)
- [ ] `src/client/pages/StoresManagement.jsx` (Stores & Products)
- [ ] `src/client/pages/ProductsManagement.jsx` (Stores & Products)
- [ ] `src/client/pages/FlightsManagement.jsx` (Flights & Passengers)
- [ ] `src/client/pages/PassengersManagement.jsx` (Flights & Passengers)
- [ ] `src/client/pages/LibrariesManagement.jsx` (Libraries & Books)
- [ ] `src/client/pages/BooksManagement.jsx` (Libraries & Books)
- [ ] `src/client/pages/HotelsManagement.jsx` (Hotels & Rooms)
- [ ] `src/client/pages/RoomsManagement.jsx` (Hotels & Rooms)
- [ ] `src/client/pages/PlanetsManagement.jsx` (Planets & Satellites)
- [ ] `src/client/pages/SatellitesManagement.jsx` (Planets & Satellites)
- [ ] `src/client/pages/Teams.jsx` (Teams & Players)
- [ ] `src/client/pages/Players.jsx` (Teams & Players)
- [ ] `src/client/pages/Lecturers.jsx` (Lecturers & Lectures)
- [ ] `src/client/pages/Lectures.jsx` (Lecturers & Lectures)
- [ ] `src/client/pages/Employees.jsx` (Employees & Contracts)
- [ ] `src/client/pages/Contracts.jsx` (Employees & Contracts)

### 🔧 **Update These Files:**
- [ ] **`src/client/App.jsx`** - Remove routes for management systems you don't need
- [ ] **`src/client/pages/AppPages/AdminPages.jsx`** - Remove imports and switch cases for management systems you don't need
- [ ] **`src/client/admin/AdminNavbar.jsx`** - Remove navigation links for management systems you don't need
- [ ] **`src/client/utils/api.js`** - Remove API objects for management systems you don't need

---

## 🗃️ **Database Files Cleanup**

### ❌ **Delete These SQL Files (If They Exist):**
- [ ] `current_database/student_course_tables.sql` (Students & Courses)
- [ ] `current_database/doctor_appointment_tables.sql` (Doctors & Appointments)
- [ ] `current_database/movie_actor_tables.sql` (Movies & Actors)
- [ ] `current_database/teacher_subject_tables.sql` (Teachers & Subjects)
- [ ] `current_database/store_product_tables.sql` (Stores & Products)
- [ ] `current_database/flight_passenger_tables.sql` (Flights & Passengers)
- [ ] `current_database/library_book_tables.sql` (Libraries & Books)
- [ ] `current_database/hotel_room_tables.sql` (Hotels & Rooms)
- [ ] `current_database/planet_satellite_tables.sql` (Planets & Satellites)
- [ ] `current_database/team_player_tables.sql` (Teams & Players)
- [ ] `current_database/lecturer_lecture_tables.sql` (Lecturers & Lectures)
- [ ] `current_database/employee_contract_tables.sql` (Employees & Contracts)

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
- [ ] Search for any remaining references to management systems you don't need
- [ ] Remove any unused imports
- [ ] Clean up any leftover navigation links
- [ ] Remove any unused API endpoints

### ✅ **Verify Final State:**
- [ ] Only the management systems you need remain
- [ ] All navigation links point to valid pages
- [ ] No broken imports or references
- [ ] Database only contains tables you need
- [ ] Clean, professional codebase

---

## 🎯 **Expected Final Admin Navigation:**
```
Dashboard
[Your chosen management systems]
[Original Shneta features]
```

---

## ⚠️ **Important Notes:**
1. **Backup first** - Make sure you have a backup before deleting anything
2. **Test after each section** - Don't delete everything at once
3. **Keep original Shneta features** - Don't touch the main business functionality
4. **Database last** - Delete database tables only after confirming everything else works
5. **Choose wisely** - Only keep the management systems you actually need for your task

---

## 🚀 **Result:**
A clean, professional codebase with only:
- ✅ Original Shneta business functionality
- ✅ Management systems you actually need
- ❌ No unnecessary test features or code
