# Employee and Contract Management System Implementation

## Overview
This implementation provides a complete CRUD system for managing Employees and Contracts as specified in the assignment. The system includes both backend API endpoints and frontend management interfaces.

## Database Structure

### Employees Table
- `Id` (INT, Primary Key, Auto Increment)
- `Name` (VARCHAR(255), Not Null)
- `Surname` (VARCHAR(255), Not Null)

### Contracts Table
- `Id` (INT, Primary Key, Auto Increment)
- `Title` (VARCHAR(255), Not Null)
- `Description` (TEXT, Nullable)
- `EmployeeId` (INT, Foreign Key to Employees.Id)

## Backend Implementation

### Models
- `src/server/models/Employee.js` - Employee model with associations
- `src/server/models/Contract.js` - Contract model with employee relationship

### Controllers
- `src/server/controllers/EmployeeController.js` - Employee CRUD operations
- `src/server/controllers/ContractController.js` - Contract CRUD operations

### Repositories
- `src/server/repositories/EmployeeRepository.js` - Employee data access layer
- `src/server/repositories/ContractRepository.js` - Contract data access layer

### Routes
- `src/server/routes/employeeRoutes.js` - Employee API endpoints
- `src/server/routes/contractRoutes.js` - Contract API endpoints

### API Endpoints

#### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

#### Contracts
- `GET /api/contracts` - Get all contracts
- `GET /api/contracts/:id` - Get contract by ID
- `GET /api/contracts/employee/:employeeId` - Get contracts by employee
- `POST /api/contracts` - Create new contract
- `PUT /api/contracts/:id` - Update contract
- `DELETE /api/contracts/:id` - Delete contract

## Frontend Implementation

### Pages
- `src/client/pages/Employees.jsx` - Employee management interface
- `src/client/pages/Contracts.jsx` - Contract management interface

### Features
- **Employees Management:**
  - View all employees in a table
  - Add new employees
  - Edit existing employees (with pre-populated forms)
  - Delete employees
  - Show contract count for each employee
  - Modal-based forms

- **Contracts Management:**
  - View all contracts with employee information
  - Add new contracts with employee dropdown selection
  - Edit existing contracts
  - Delete contracts (with delete button in list)
  - Employee dropdown for contract selection

### Navigation
- Added "Employees" and "Contracts" links to the admin navigation
- Routes configured in App.jsx for `/admin/employees` and `/admin/contracts`

## Sample Data
The system includes sample data:

### Employees
1. John Doe (ID: 1)
2. Jane Smith (ID: 2)
3. Mike Johnson (ID: 3)
4. Sarah Wilson (ID: 4)

### Contracts
1. Software Developer Contract (John Doe)
2. Project Manager Contract (Jane Smith)
3. UI/UX Designer Contract (Mike Johnson)
4. Data Analyst Contract (Sarah Wilson)
5. Senior Developer Contract (John Doe)

## Assignment Requirements Fulfilled

### a) Create Employee ✅
- Frontend form for adding employees
- Backend API endpoint for employee creation
- Sample employees included

### b) Create Contract ✅
- Frontend form with employee dropdown selection
- Backend API endpoint for contract creation
- Sample contracts included

### c) Read All (Display) ✅
- Table view for all employees
- Table view for all contracts with employee information
- Clean, organized display

### d) Update Employee ✅
- Employee update functionality with pre-populated forms
- All fields (Name, Surname) are pre-populated with current data
- Backend API endpoint for employee updates

### e) Delete Contract ✅
- Delete functionality with confirmation dialog
- Delete button implemented within the contracts list
- Backend API endpoint for contract deletion

## How to Use

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Access the admin panel:**
   - Navigate to `/admin` in your browser
   - Login with admin credentials

3. **Manage Employees:**
   - Click "Employees" in the admin navigation
   - Add, edit, or delete employees as needed

4. **Manage Contracts:**
   - Click "Contracts" in the admin navigation
   - Add, edit, or delete contracts
   - Use the employee dropdown when adding/editing contracts

## Technical Notes
- Uses Sequelize ORM for database operations
- Implements proper error handling
- Includes form validation
- Responsive design with Tailwind CSS
- Modal-based forms for better UX
- Confirmation dialogs for delete operations
- Pre-populated forms for editing
- Employee dropdown for contract selection
- Admin authentication required for all operations

## Grade Requirements

### For Grade 6:
✅ **Employee CRUD Operations Only**
- Create Employee
- Read All Employees
- Update Employee
- Delete Employee

### For Project Grade:
✅ **Complete Implementation**
- All Employee CRUD operations
- All Contract CRUD operations
- Employee dropdown in contract creation
- Pre-populated edit forms
- Delete buttons in contract list

The system is now fully functional and ready for use!
