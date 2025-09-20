const jwt = require('jsonwebtoken');
const AdminService = require('../services/AdminService');
const PasswordUtils = require('../utils/PasswordUtils');
const RefreshTokenService = require('../services/RefreshTokenService');

class AdminController {
    constructor() {
        this.adminService = new AdminService();
        this.refreshTokenService = new RefreshTokenService();
    }

    async adminLogin(req, res) {
        try {
            const { email, password, kodi_personal } = req.body;
            console.log('Admin login attempt:', { email, password, kodi_personal });
            
            const admin = await this.adminService.getAdminByEmail(email);
            console.log('Found admin:', { adminID: admin.adminID, email: admin.email, hasPassword: !!admin.pass });
            
            // Check if password is hashed or plain text
            let isPasswordValid = false;
            
            // First try bcrypt comparison (for hashed passwords)
            if (admin.pass && (admin.pass.startsWith('$2b$') || admin.pass.startsWith('$2a$') || admin.pass.startsWith('$2y$'))) {
                isPasswordValid = await PasswordUtils.comparePassword(password, admin.pass);
                console.log('Used bcrypt comparison:', isPasswordValid);
            } else {
                // For plain text passwords (legacy support)
                isPasswordValid = password === admin.pass;
                console.log('Used plain text comparison:', isPasswordValid, 'Expected:', admin.pass, 'Got:', password);
            }
            
            // Also check personal code if provided
            const isPersonalCodeValid = !kodi_personal || admin.kodi_personal == kodi_personal;
            console.log('Personal code check:', isPersonalCodeValid, 'Expected:', admin.kodi_personal, 'Got:', kodi_personal);
                
            if (isPasswordValid && isPersonalCodeValid) {
                // For now, create a simple JWT token without refresh token complexity
                const jwt = require('jsonwebtoken');
                const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
                
                const accessToken = jwt.sign(
                    { 
                        adminID: admin.adminID, 
                        email: admin.email, 
                        role: 'admin' 
                    },
                    JWT_SECRET,
                    { expiresIn: '24h' }
                );
                
                console.log('Login successful for admin:', admin.adminID);
                
                return res.status(200).json({ 
                    accessToken,
                    role: 'admin',
                    adminID: admin.adminID,
                    email: admin.email,
                    expiresIn: 86400 // 24 hours in seconds
                });
            } else {
                console.log('Login failed - invalid credentials');
                return res.status(401).json({ message: 'Invalid email, password, or personal code' });
            }
        } catch (error) {
            console.error('Error in adminLogin:', error);
            return res.status(500).json({ message: 'Admin login failed: ' + error.message });
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

    async getDashboardStats(req, res) {
        try {
            const stats = await this.adminService.getDashboardStats();
            return res.status(200).json(stats);
        } catch (error) {
            console.error('Error getting dashboard stats:', error);
            res.status(500).json({
                message: 'Error fetching dashboard statistics',
                error: error.message
            });
        }
    }
}

module.exports = AdminController;