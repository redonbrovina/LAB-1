const RefreshTokenRepository = require('../repositories/RefreshTokenRepository');
const jwt = require('jsonwebtoken');

class RefreshTokenService {
    constructor() {
        this.refreshTokenRepository = new RefreshTokenRepository();
    }

    async createRefreshToken(userID, userType) {
        // Generate refresh token
        const refreshToken = jwt.sign(
            { 
                userID, 
                userType, 
                type: 'refresh',
                iat: Math.floor(Date.now() / 1000)
            },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        // Calculate expiration date
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        // Store in database
        const tokenData = {
            token: refreshToken,
            userID,
            userType,
            expiresAt,
            isRevoked: false
        };

        return await this.refreshTokenRepository.createRefreshToken(tokenData);
    }

    async validateRefreshToken(token) {
        try {
            // Verify JWT token
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            
            // Check if token exists in database and is not revoked
            const storedToken = await this.refreshTokenRepository.getValidToken(token);
            
            if (!storedToken) {
                throw new Error('Invalid refresh token');
            }

            return decoded;
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    async revokeRefreshToken(token) {
        return await this.refreshTokenRepository.revokeToken(token);
    }

    async revokeAllUserTokens(userID, userType) {
        return await this.refreshTokenRepository.revokeAllUserTokens(userID, userType);
    }

    async cleanupExpiredTokens() {
        return await this.refreshTokenRepository.cleanupExpiredTokens();
    }

    generateAccessToken(userID, userType) {
        return jwt.sign(
            { id: userID, role: userType },
            process.env.JWT_SECRET,
            { expiresIn: '15m' } // 15 minutes
        );
    }
}

module.exports = RefreshTokenService;
