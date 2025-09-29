const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Apply authentication and admin role middleware to all routes
router.use(authenticateToken);
router.use(requireRole('admin'));

// GET /api/employees - Get all employees
router.get('/', employeeController.getAllEmployees);

// GET /api/employees/:id - Get employee by ID
router.get('/:id', employeeController.getEmployeeById);

// POST /api/employees - Create new employee
router.post('/', employeeController.createEmployee);

// PUT /api/employees/:id - Update employee
router.put('/:id', employeeController.updateEmployee);

// DELETE /api/employees/:id - Delete employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
