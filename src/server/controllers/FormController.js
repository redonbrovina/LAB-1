const jwt = require('jsonwebtoken');
const ShtetiService = require('../services/ShtetiService');
const KlientiService = require('../services/KlientiService');
const AplikimiService = require('../services/AplikimiService');
const PasswordUtils = require('../utils/PasswordUtils');
const RefreshTokenService = require('../services/RefreshTokenService');

class FormController {
    constructor() {
        this.shtetiService = new ShtetiService();
        this.klientiService = new KlientiService();
        this.aplikimiService = new AplikimiService();
        this.refreshTokenService = new RefreshTokenService();
    }

    async checkLogin(req, res) {
        try {
            const { email, password } = req.body;
            
            const klientet = await this.klientiService.getKlientiByEmail(email);
            
            const isPasswordValid = await PasswordUtils.comparePassword(password, klientet[0].password);
                
            if (isPasswordValid) {
                // Generate access token (15 minutes)
                const accessToken = this.refreshTokenService.generateAccessToken(klientet[0].klientiID, 'klient');
                
                // Generate refresh token (7 days)
                const refreshTokenData = await this.refreshTokenService.createRefreshToken(klientet[0].klientiID, 'klient');
                
                return res.status(200).json({ 
                    accessToken,
                    refreshToken: refreshTokenData.token,
                    expiresIn: 900 // 15 minutes in seconds
                });
            } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Authentication check failed' });
        }
    }

    async checkApplication(req, res) {
        try {
            const { email } = req.body;
            const existingClient = await this.klientiService.getKlientiByEmail(email);
            
            if (existingClient && existingClient.length > 0) {
                return res.status(400).json({ message: 'Email already in use' });
            } else {
                await this.aplikimiService.createAplikimi(req.body);
                return res.status(200).json({ message: 'Application created successfully' });
            }
        } catch (error) {
            console.error('Error in checkApplication middleware:', error);
            return res.status(500).json({ message: 'Application check failed' });
        }
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
            const { refreshToken } = req.body;
            
            if (!refreshToken) {
                return res.status(401).json({ message: 'Refresh token required' });
            }
            
            // Validate refresh token
            const decoded = await this.refreshTokenService.validateRefreshToken(refreshToken);
            
            // Generate new access token
            const accessToken = this.refreshTokenService.generateAccessToken(decoded.userID, decoded.userType);
            
            return res.status(200).json({ 
                accessToken,
                expiresIn: 900 // 15 minutes in seconds
            });
            
        } catch (error) {
            console.error('Refresh token error:', error);
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.body;
            
            if (refreshToken) {
                // Revoke the refresh token
                await this.refreshTokenService.revokeRefreshToken(refreshToken);
            }
            
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error('Error in logout:', error);
            return res.status(500).json({ message: 'Logout failed' });
        }
    }
}

module.exports = FormController;
