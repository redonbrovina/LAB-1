const jwt = require('jsonwebtoken');
const ShtetiService = require('../services/ShtetiService');
const KlientiService = require('../services/KlientiService');
const AplikimiController = require('./AplikimiController');
const PasswordUtils = require('../utils/PasswordUtils');
const RefreshTokenService = require('../services/RefreshTokenService');
const AdminService = require('../services/AdminService');

class FormController {
    constructor() {
        this.shtetiService = new ShtetiService();
        this.klientiService = new KlientiService();
        this.aplikimiController = new AplikimiController();
        this.refreshTokenService = new RefreshTokenService();
        this.adminService = new AdminService();
    }


    async getAllShtetet(req, res) {
        try {
            console.log('Fetching countries...');
            const countries = await this.shtetiService.getAllShtetet();
            return res.status(200).json(countries);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching countries',
                error: error.message
            });
        }
    }

    async refreshToken(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            
            if (!refreshToken) {
                return res.status(401).json({ message: 'Refresh token required' });
            }
            
            // Validate refresh token
            const decoded = await this.refreshTokenService.validateRefreshToken(refreshToken);
            
            // Generate new access token
            const accessToken = this.refreshTokenService.generateAccessToken(decoded.userID, decoded.userType);
            
            // Set new access token in httpOnly cookie
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000 // 15 minutes
            });
            
            return res.status(200).json({ 
                message: 'Token refreshed successfully',
                expiresIn: 900 // 15 minutes in seconds
            });
            
        } catch (error) {
            console.error('=== REFRESH TOKEN ERROR ===', error);
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
    }

    async getUserInfo(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'No user found in request' });
            }
            
            const { adminID, klientiID, role } = req.user;
            
            if (role === 'klient') {
                // Get client info
                const klienti = await this.klientiService.getKlientiById(klientiID);
                if (!klienti || klienti.length === 0) {
                    return res.status(404).json({ message: 'Client not found' });
                }
                
                const client = klienti;
                return res.json({
                    klientiID: client.klientiID,
                    email: client.email,
                    role: 'klient'
                });
            } else if (role === 'admin') {
                const admin = await this.adminService.getAdminById(adminID);
                if (!admin || admin.length === 0) {
                    return res.status(404).json({ message: 'Admin not found' });
                }
                
                return res.json({
                    adminID: admin.adminID,
                    email: admin.email,
                    role: 'admin'
                });
            } else {
                return res.status(400).json({ message: 'Invalid user role' });
            }
            
        } catch (error) {
            console.error('Get user info error:', error);
            res.status(500).json({ message: 'Error getting user info' });
        }
    }

    async logout(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            
            if (refreshToken) {
                // Revoke the refresh token
                await this.refreshTokenService.revokeRefreshToken(refreshToken);
            }
            
            // Clear cookies
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error('Error in logout:', error);
            return res.status(500).json({ message: 'Logout failed' });
        }
    }
}

module.exports = FormController;
