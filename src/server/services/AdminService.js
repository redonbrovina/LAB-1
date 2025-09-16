const { AdminRepository } = require('../repositories');

class AdminService {
    constructor() {
        this.adminRepository = new AdminRepository();
    }
    async getAllAdminet() {
        return await this.adminRepository.getAllAdminet();
    }
    async getAdminById(adminID) {
        return await this.adminRepository.getAdminById(adminID);
    }
    async getAdminByEmail(email) {
        return await this.adminRepository.getAdminByEmail(email);
    }
    async updateAdmin(adminID, data) {
        return await this.adminRepository.updateAdmin(adminID, data);
    }
    async deleteAdmin(adminID) {
        return await this.adminRepository.deleteAdmin(adminID);
    }
}

module.exports = AdminService;