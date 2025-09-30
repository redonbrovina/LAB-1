const EmployeeService = require("../services/EmployeeService");

class EmployeeController {
    constructor() {
        this.employeeService = new EmployeeService();
    }

    async getAll(req, res) {
        try {
            const data = await this.employeeService.getAllEmployees();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const data = await this.employeeService.getEmployeeById(req.params.id);
            res.json(data);
        } catch (err) {
            if (err.message === "Employee not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async create(req, res) {
        try {
            const data = await this.employeeService.createEmployee(req.body);
            res.status(201).json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const data = await this.employeeService.updateEmployee(req.params.id, req.body);
            res.json(data);
        } catch (err) {
            if (err.message === "Employee not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.employeeService.deleteEmployee(req.params.id);
            res.json({ message: "Employee deleted successfully" });
        } catch (err) {
            if (err.message === "Employee not found") {
                res.status(404).json({ message: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }
}

module.exports = EmployeeController;
