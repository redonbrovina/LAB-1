const EmployeeRepository = require("../repositories/EmployeeRepository");

class EmployeeService {
    constructor() {
        this.employeeRepo = new EmployeeRepository();
    }

    async getAllEmployees() {
        return await this.employeeRepo.getAllEmployees();
    }

    async getEmployeeById(id) {
        const employee = await this.employeeRepo.getEmployeeById(id);
        if (!employee) throw new Error("Employee not found");
        return employee;
    }

    async createEmployee(data) {
        return await this.employeeRepo.createEmployee(data);
    }

    async updateEmployee(id, data) {
        await this.getEmployeeById(id);
        return await this.employeeRepo.updateEmployee(id, data);
    }

    async deleteEmployee(id) {
        await this.getEmployeeById(id);
        return await this.employeeRepo.deleteEmployee(id);
    }
}

module.exports = EmployeeService;
