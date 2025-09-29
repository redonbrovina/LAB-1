const BaseRepository = require('./BaseRepository');
const { Employee } = require('../models');

class EmployeeRepository extends BaseRepository {
    constructor() {
        super(Employee);
    }

    async getAllEmployees() {
        return await this.model.findAll({
            include: [{
                model: require('../models').Contract,
                as: 'contracts'
            }]
        });
    }

    async getEmployeeById(id) {
        return await this.model.findByPk(id, {
            include: [{
                model: require('../models').Contract,
                as: 'contracts'
            }]
        });
    }

    async createEmployee(employeeData) {
        return await this.model.create(employeeData);
    }

    async updateEmployee(id, employeeData) {
        const employee = await this.model.findByPk(id);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return await employee.update(employeeData);
    }

    async deleteEmployee(id) {
        const employee = await this.model.findByPk(id);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return await employee.destroy();
    }
}

module.exports = new EmployeeRepository();
