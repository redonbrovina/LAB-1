const BaseRepository = require("./BaseRepository");

class AdminRepository extends BaseRepository {
    constructor() {
        super('administrator', 'adminID');
    }
    async getAllAdminet() {
        return await this.getAll();
    }

    async getAdminById(adminID) {
        return await this.getByField('adminID', adminID);
    }

    async getAdminByEmail(email) {
        return await this.getByField('email', email);
    }

    async updateAdmin(adminID, data) {
        return await this.update(adminID, data);
    }

    async deleteAdmin(adminID) {
        return await this.deleteById(adminID);
    }

}

module.exports = AdminRepository;