const jwt = require('jsonwebtoken');
const ShtetiService = require('../services/ShtetiService');
const KlientiService = require('../services/KlientiService');
const AplikimiController = require('./AplikimiController');
const PasswordUtils = require('../utils/PasswordUtils');
const RefreshTokenService = require('../services/RefreshTokenService');

class FormController {
    constructor() {
        this.shtetiService = new ShtetiService();
        this.klientiService = new KlientiService();
        this.aplikimiController = new AplikimiController();
        this.refreshTokenService = new RefreshTokenService();
    }

    async checkLogin(req, res) {
        try {
            const { email, password } = req.body;
            console.log('Client login attempt:', { email, password });
            
            const klientet = await this.klientiService.getKlientiByEmail(email);
            console.log('Found client:', { klientiID: klientet[0].klientiID, email: klientet[0].email, hasPassword: !!klientet[0].password });
            
            if (!klientet || klientet.length === 0) {
                console.log('No client found with email:', email);
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            
            // Check if password is hashed or plain text
            let isPasswordValid = false;
            
            // First try bcrypt comparison (for hashed passwords)
            if (klientet[0].password && (klientet[0].password.startsWith('$2b$') || klientet[0].password.startsWith('$2a$') || klientet[0].password.startsWith('$2y$'))) {
                isPasswordValid = await PasswordUtils.comparePassword(password, klientet[0].password);
                console.log('Used bcrypt comparison:', isPasswordValid);
            } else {
                // For plain text passwords (legacy support)
                isPasswordValid = password === klientet[0].password;
                console.log('Used plain text comparison:', isPasswordValid, 'Expected:', klientet[0].password, 'Got:', password);
            }
                
            if (isPasswordValid) {
                // Generate access token (15 minutes)
                const accessToken = this.refreshTokenService.generateAccessToken(klientet[0].klientiID, 'klient');
                
                // Generate refresh token (7 days)
                const refreshTokenData = await this.refreshTokenService.createRefreshToken(klientet[0].klientiID, 'klient');
                
                console.log('Login successful for client:', klientet[0].klientiID);
                
                return res.status(200).json({ 
                    accessToken,
                    refreshToken: refreshTokenData.token,
                    expiresIn: 900 // 15 minutes in seconds
                });
            } else {
                console.log('Login failed - invalid credentials');
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error('Error in checkLogin:', error);
            return res.status(500).json({ message: 'Authentication check failed: ' + error.message });
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
            console.log('=== REFRESH TOKEN ENDPOINT CALLED ===');
            const { refreshToken } = req.body;
            console.log('Refresh token provided:', refreshToken ? 'YES' : 'NO');
            
            if (!refreshToken) {
                console.log('No refresh token provided');
                return res.status(401).json({ message: 'Refresh token required' });
            }
            
            // Validate refresh token
            console.log('Validating refresh token...');
            const decoded = await this.refreshTokenService.validateRefreshToken(refreshToken);
            console.log('Refresh token validated successfully for user:', decoded.userID, 'type:', decoded.userType);
            
            // Generate new access token
            console.log('Generating new access token...');
            const accessToken = this.refreshTokenService.generateAccessToken(decoded.userID, decoded.userType);
            console.log('New access token generated successfully');
            
            console.log('=== REFRESH TOKEN SUCCESS ===');
            return res.status(200).json({ 
                accessToken,
                expiresIn: 10 // 10 seconds for testing
            });
            
        } catch (error) {
            console.error('=== REFRESH TOKEN ERROR ===', error);
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
