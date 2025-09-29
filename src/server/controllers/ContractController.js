const contractRepository = require('../repositories/ContractRepository');

class ContractController {
    async getAllContracts(req, res) {
        try {
            const contracts = await contractRepository.getAllContracts();
            res.json(contracts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getContractById(req, res) {
        try {
            const { id } = req.params;
            const contract = await contractRepository.getContractById(id);
            if (!contract) {
                return res.status(404).json({ error: 'Contract not found' });
            }
            res.json(contract);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createContract(req, res) {
        try {
            const contractData = req.body;
            const contract = await contractRepository.createContract(contractData);
            res.status(201).json(contract);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateContract(req, res) {
        try {
            const { id } = req.params;
            const contractData = req.body;
            const contract = await contractRepository.updateContract(id, contractData);
            res.json(contract);
        } catch (error) {
            if (error.message === 'Contract not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    async deleteContract(req, res) {
        try {
            const { id } = req.params;
            await contractRepository.deleteContract(id);
            res.json({ message: 'Contract deleted successfully' });
        } catch (error) {
            if (error.message === 'Contract not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    async getContractsByEmployee(req, res) {
        try {
            const { employeeId } = req.params;
            const contracts = await contractRepository.getContractsByEmployee(employeeId);
            res.json(contracts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ContractController();
