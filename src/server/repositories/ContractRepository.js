const BaseRepository = require('./BaseRepository');
const { Contract, Employee } = require('../models');

class ContractRepository extends BaseRepository {
    constructor() {
        super(Contract);
    }

    async getAllContracts() {
        return await this.model.findAll({
            include: [{
                model: Employee,
                as: 'employee'
            }]
        });
    }

    async getContractById(id) {
        return await this.model.findByPk(id, {
            include: [{
                model: Employee,
                as: 'employee'
            }]
        });
    }

    async createContract(contractData) {
        return await this.model.create(contractData);
    }

    async updateContract(id, contractData) {
        const contract = await this.model.findByPk(id);
        if (!contract) {
            throw new Error('Contract not found');
        }
        return await contract.update(contractData);
    }

    async deleteContract(id) {
        const contract = await this.model.findByPk(id);
        if (!contract) {
            throw new Error('Contract not found');
        }
        return await contract.destroy();
    }

    async getContractsByEmployee(employeeId) {
        return await this.model.findAll({
            where: { EmployeeId: employeeId },
            include: [{
                model: Employee,
                as: 'employee'
            }]
        });
    }
}

module.exports = new ContractRepository();
