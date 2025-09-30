const BaseRepository = require("./BaseRepository");
const { Contract, Employee } = require("../models");

class ContractRepository extends BaseRepository {
    constructor() {
        super(Contract);
    }

    async getAllContracts() {
        return await this.getAll({
            include: [
                {
                    model: Employee,
                    as: 'employee',
                    attributes: ['ID', 'Name', 'Surname']
                }
            ],
            order: [['ID', 'ASC']]
        });
    }

    async getContractById(contractId) {
        return await this.getOneByField('ID', contractId, {
            include: [
                {
                    model: Employee,
                    as: 'employee',
                    attributes: ['ID', 'Name', 'Surname']
                }
            ]
        });
    }

    async createContract(data) {
        return await this.insert(data);
    }

    async updateContract(contractId, data) {
        return await this.updateById(contractId, data);
    }

    async deleteContract(contractId) {
        return await this.deleteById(contractId);
    }
}

module.exports = ContractRepository;
