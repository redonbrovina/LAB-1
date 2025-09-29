const express = require('express');
const router = express.Router();
const contractController = require('../controllers/ContractController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Apply authentication and admin role middleware to all routes
router.use(authenticateToken);
router.use(requireRole('admin'));

// GET /api/contracts - Get all contracts
router.get('/', contractController.getAllContracts);

// GET /api/contracts/:id - Get contract by ID
router.get('/:id', contractController.getContractById);

// POST /api/contracts - Create new contract
router.post('/', contractController.createContract);

// PUT /api/contracts/:id - Update contract
router.put('/:id', contractController.updateContract);

// DELETE /api/contracts/:id - Delete contract
router.delete('/:id', contractController.deleteContract);

// GET /api/contracts/employee/:employeeId - Get contracts by employee
router.get('/employee/:employeeId', contractController.getContractsByEmployee);

module.exports = router;
