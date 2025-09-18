const jwt = require('jsonwebtoken');
const AdminService = require('../services/AdminService');

class AdminController {
    constructor() {
        this.adminService = new AdminService();
    }

    async adminLogin(req, res) {
        try {
            const { email, password, kodi_personal } = req.body;
            const admin = await this.adminService.getAdminByEmail(email);
            
            if (admin && admin.pass === password && admin.kodi_personal == kodi_personal) {
                const token = jwt.sign(
                    { id: admin.adminID, role: 'admin' },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                return res.status(200).json({ token, role: 'admin' });
            } else {
                return res.status(401).json({ message: 'Invalid email, password, or personal code' });
            }
        } catch (error) {
            console.error('Error in adminLogin:', error);
            return res.status(500).json({ message: 'Admin login failed' });
        }
    }

    async getAllAdminet(req, res) {
        try {
            const adminet = await this.adminService.getAllAdminet();
            return res.status(200).json(adminet);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching admins',
                error: error.message
            });
        }
    }

    async getAdminById(req, res) {
        try {
            const admin = await this.adminService.getAdminById(req.params.adminID);
            return res.status(200).json(admin);
        } catch (error) {
            if (error.message === "Admin nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error fetching admin by ID',
                    error: error.message
                });
            }
        }
    }

    async createAdmin(req, res) {
        try {
            const newAdmin = await this.adminService.createAdmin(req.body);
            res.status(201).json(newAdmin);
        } catch (error) {
            res.status(500).json({
                message: 'Error creating admin',
                error: error.message
            });
        }
    }

    async updateAdmin(req, res) {
        try {
            const updatedAdmin = await this.adminService.updateAdmin(req.params.adminID, req.body);
            return res.status(200).json(updatedAdmin);
        } catch (error) {
            if (error.message === "Admin nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error updating admin',
                    error: error.message
                });
            }
        }
    }

    async deleteAdmin(req, res) {
        try {
            await this.adminService.deleteAdmin(req.params.adminID);
            return res.status(204).send();
        } catch (error) {
            if (error.message === "Admin nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error deleting admin',
                    error: error.message
                });
            }
        }
    }
}

module.exports = AdminController;