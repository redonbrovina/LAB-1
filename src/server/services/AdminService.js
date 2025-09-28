const AdminRepository = require('../repositories/AdminRepository');

class AdminService {
    constructor() {
        this.adminRepository = new AdminRepository();
    }

    async getAllAdminet() {
        return await this.adminRepository.getAllAdminet();
    }

    async getAdminById(adminID) {
        const admin = await this.adminRepository.getAdminById(adminID);
        if (!admin) throw new Error("Admin not found");
        return admin;
    }

    async getAdminByEmail(email) {
        const admin = await this.adminRepository.getAdminByEmail(email);
        if (!admin) throw new Error("Admin not found");
        return admin;
    }

    async createAdmin(data) {
        return await this.adminRepository.createAdmin(data);
    }

    async updateAdmin(adminID, data) {
        await this.getAdminById(adminID);
        return await this.adminRepository.updateAdmin(adminID, data);
    }

    async deleteAdmin(adminID) {
        return await this.adminRepository.deleteAdmin(adminID);
    }

    async getDashboardStats() {
        return await this.adminRepository.getDashboardStats();
    }
}

module.exports = AdminService;