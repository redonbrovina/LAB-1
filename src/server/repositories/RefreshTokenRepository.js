const BaseRepository = require('./BaseRepository');
const { RefreshToken } = require('../models');

class RefreshTokenRepository extends BaseRepository {
    constructor() {
        super(RefreshToken);
    }

    async createRefreshToken(data) {
        return await this.insert(data);
    }

    async getValidToken(token) {
        return await this.getOneByField('token', token, {
            where: {
                isRevoked: false,
                expiresAt: {
                    [require('sequelize').Op.gt]: new Date()
                }
            }
        });
    }

    async revokeToken(token) {
        return await this.model.update(
            { isRevoked: true },
            { where: { token } }
        );
    }

    async revokeAllUserTokens(userID, userType) {
        return await this.model.update(
            { isRevoked: true },
            { 
                where: { 
                    userID,
                    userType,
                    isRevoked: false
                } 
            }
        );
    }

    async cleanupExpiredTokens() {
        return await this.model.destroy({
            where: {
                expiresAt: {
                    [require('sequelize').Op.lt]: new Date()
                }
            }
        });
    }

    async getUserTokens(userID, userType) {
        return await this.getByField('userID', userID, {
            where: {
                userType,
                isRevoked: false
            }
        });
    }
}

module.exports = RefreshTokenRepository;
