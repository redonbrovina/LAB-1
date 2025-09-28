const RefreshTokenRepository = require('../repositories/RefreshTokenRepository');
const jwt = require('jsonwebtoken');

// Use fallback secrets if environment variables are not set
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-fallback-refresh-secret-key-change-in-production';

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
            JWT_REFRESH_SECRET,
            { expiresIn: '7d' } // 7 days
        );

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

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
            console.log('=== VALIDATING REFRESH TOKEN ===');
            console.log('Token (first 20 chars):', token.substring(0, 20) + '...');
            
            // Verify JWT token
            const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
            console.log('JWT verification successful, decoded:', decoded);
            
            // Check if token exists in database and is not revoked
            const storedToken = await this.refreshTokenRepository.getValidToken(token);
            console.log('Database token check result:', storedToken ? 'FOUND' : 'NOT FOUND');
            
            if (!storedToken) {
                console.log('❌ Token not found in database or revoked');
                throw new Error('Invalid refresh token');
            }

            console.log('✅ Refresh token validation successful');
            return decoded;
        } catch (error) {
            console.error('❌ Refresh token validation error:', error.message);
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
        console.log('=== GENERATING ACCESS TOKEN ===');
        return jwt.sign(
            { id: userID, role: userType },
            JWT_SECRET,
            { expiresIn: '15m' } // 15 minutes
        );
    }
}

module.exports = RefreshTokenService;
