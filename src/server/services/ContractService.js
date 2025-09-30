const ContractRepository = require("../repositories/ContractRepository");

class ContractService {
    constructor() {
        this.contractRepo = new ContractRepository();
    }

    async getAll() {
        return await this.contractRepo.getAllContracts();
    }

    async getById(id) {
        const contract = await this.contractRepo.getContractById(id);
        if (!contract) throw new Error("Contract not found");
        return contract;
    }

    async create(data) {
        return await this.contractRepo.createContract(data);
    }

    async update(id, data) {
        await this.getById(id);
        return await this.contractRepo.updateContract(id, data);
    }

    async delete(id) {
        await this.getById(id);
        return await this.contractRepo.deleteContract(id);
    }
}

module.exports = ContractService;
