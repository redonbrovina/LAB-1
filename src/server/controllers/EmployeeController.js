const employeeRepository = require('../repositories/EmployeeRepository');

class EmployeeController {
    async getAllEmployees(req, res) {
        try {
            const employees = await employeeRepository.getAllEmployees();
            res.json(employees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEmployeeById(req, res) {
        try {
            const { id } = req.params;
            const employee = await employeeRepository.getEmployeeById(id);
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.json(employee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createEmployee(req, res) {
        try {
            const employeeData = req.body;
            const employee = await employeeRepository.createEmployee(employeeData);
            res.status(201).json(employee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateEmployee(req, res) {
        try {
            const { id } = req.params;
            const employeeData = req.body;
            const employee = await employeeRepository.updateEmployee(id, employeeData);
            res.json(employee);
        } catch (error) {
            if (error.message === 'Employee not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    async deleteEmployee(req, res) {
        try {
            const { id } = req.params;
            await employeeRepository.deleteEmployee(id);
            res.json({ message: 'Employee deleted successfully' });
        } catch (error) {
            if (error.message === 'Employee not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EmployeeController();
