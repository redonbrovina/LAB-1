const BaseRepository = require("./BaseRepository");
const { Admin } = require("../models");

class AdminRepository extends BaseRepository {
    constructor() {
        super(Admin);
    }

    async getAllAdminet() {
        return await this.getAll({
            attributes: ['adminID', 'email', 'kodi_personal']
        });
    }

    async getAdminById(adminID) {
        return await this.getOneByField('adminID', adminID);
    }

    async getAdminByEmail(email) {
        return await this.getOneByField('email', email);
    }

    async createAdmin(data) {
        return await this.insert(data);
    }

    async updateAdmin(adminID, data) {
        return await this.updateById(adminID, data);
    }

    async deleteAdmin(adminID) {
        return await this.deleteById(adminID);
    }
}

module.exports = AdminRepository;