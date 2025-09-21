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
                // Generate access token (24 hours)
                const jwt = require('jsonwebtoken');
                const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
                
                const accessToken = jwt.sign(
                    { 
                        adminID: admin.adminID, 
                        email: admin.email, 
                        role: 'admin' 
                    },
                    JWT_SECRET,
                    { expiresIn: '1h' } 
                );
                
                // Generate refresh token (7 days)
                const refreshTokenData = await this.refreshTokenService.createRefreshToken(admin.adminID, 'admin');
                
                console.log('Login successful for admin:', admin.adminID);
                
                return res.status(200).json({ 
                    accessToken,
                    refreshToken: refreshTokenData.token,
                    role: 'admin',
                    adminID: admin.adminID,
                    email: admin.email,
                    expiresIn: 3600 
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

    async getCurrentAdmin(req, res) {
        try {
            const adminID = req.user.adminID;
            const admin = await this.adminService.getAdminById(parseInt(adminID));
            return res.status(200).json(admin);
        } catch (error) {
            if (error.message === "Admin nuk u gjet") {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Error fetching admin profile',
                    error: error.message
                });
            }
        }
    }

    async getAdminById(req, res) {
        try {
            const admin = await this.adminService.getAdminById(parseInt(req.params.adminID));
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
            const adminID = req.params.adminID;
            const requestingAdminID = req.user.adminID;

            // Check if admin is trying to update themselves
            if (parseInt(adminID) !== parseInt(requestingAdminID)) {
                return res.status(403).json({
                    message: 'You can only update your own profile',
                    error: 'FORBIDDEN'
                });
            }

            const { currentPassword, newPassword, ...otherData } = req.body;

            // If password change is requested
            if (currentPassword && newPassword) {
                // Get the current admin data
                const admin = await this.adminService.getAdminById(parseInt(adminID));
                
                // Verify current password
                let isCurrentPasswordValid = false;
                
                // Check if password is hashed or plain text
                if (admin.pass && (admin.pass.startsWith('$2b$') || admin.pass.startsWith('$2a$') || admin.pass.startsWith('$2y$'))) {
                    isCurrentPasswordValid = await PasswordUtils.comparePassword(currentPassword, admin.pass);
                } else {
                    // For plain text passwords (legacy support)
                    isCurrentPasswordValid = currentPassword === admin.pass;
                }
                
                if (!isCurrentPasswordValid) {
                    return res.status(400).json({
                        message: 'Current password is incorrect'
                    });
                }

                // Validate new password strength
                const passwordValidation = PasswordUtils.validatePasswordStrength(newPassword);
                if (!passwordValidation.isValid) {
                    return res.status(400).json({
                        message: passwordValidation.message
                    });
                }

                // Hash the new password
                const hashedNewPassword = await PasswordUtils.hashPassword(newPassword);
                
                // Update admin with new password
                const updateData = {
                    ...otherData,
                    pass: hashedNewPassword
                };
                
                const updatedAdmin = await this.adminService.updateAdmin(parseInt(adminID), updateData);
                return res.status(200).json(updatedAdmin);
            } else {
                // Regular update without password change
                const updatedAdmin = await this.adminService.updateAdmin(parseInt(adminID), otherData);
                return res.status(200).json(updatedAdmin);
            }
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
            const adminID = req.params.adminID;
            const requestingAdminID = req.user.adminID;

            // Check if admin is trying to delete themselves
            if (parseInt(adminID) !== parseInt(requestingAdminID)) {
                return res.status(403).json({
                    message: 'You can only delete your own account',
                    error: 'FORBIDDEN'
                });
            }

            await this.adminService.deleteAdmin(parseInt(adminID));
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