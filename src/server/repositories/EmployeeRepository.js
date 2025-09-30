const BaseRepository = require("./BaseRepository");
const { Employee, Contract } = require("../models");

class EmployeeRepository extends BaseRepository {
    constructor() {
        super(Employee);
    }

    async getAllEmployees() {
        return await this.getAll({
            include: [
                {
                    model: Contract,
                    as: 'contracts',
                    attributes: ['ID', 'Title', 'Description']
                }
            ],
            order: [['Name', 'ASC']]
        });
    }

    async getEmployeeById(employeeId) {
        return await this.getOneByField('ID', employeeId, {
            include: [
                {
                    model: Contract,
                    as: 'contracts',
                    attributes: ['ID', 'Title', 'Description']
                }
            ]
        });
    }

    async createEmployee(data) {
        return await this.insert(data);
    }

    async updateEmployee(employeeId, data) {
        return await this.updateById(employeeId, data);
    }

    async deleteEmployee(employeeId) {
        return await this.deleteById(employeeId);
    }
}

module.exports = EmployeeRepository;
