const BaseRepository = require("./BaseRepository");
const { Admin, Klienti, Pagesa, Porosia, Produkti } = require("../models");

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
        return await this.getById(adminID);
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

    async getDashboardStats() {
        try {
            // Get total users count
            const totalUsers = await Klienti.count();
            
            // Get total revenue from payments
            const totalRevenue = await Pagesa.sum('shuma_pageses');
            
            // Get total orders count
            const totalOrders = await Porosia.count();
            
            // Get total products count
            const totalProducts = await Produkti.count();
            
            return {
                totalUsers: totalUsers || 0,
                totalRevenue: parseFloat(totalRevenue || 0),
                totalOrders: totalOrders || 0,
                totalProducts: totalProducts || 0
            };
        } catch (error) {
            console.error('Error getting dashboard stats:', error);
            throw error;
        }
    }
}

module.exports = AdminRepository;