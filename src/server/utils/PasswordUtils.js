const bcrypt = require('bcrypt');

class PasswordUtils {
    static SALT_ROUNDS = 12;

    static async hashPassword(plainPassword) {
        try {
            const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
            const hashedPassword = await bcrypt.hash(plainPassword, salt);
            return hashedPassword;
        } catch (error) {
            throw new Error('Error hashing password: ' + error.message);
        }
    }

    static async comparePassword(plainPassword, hashedPassword) {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            throw new Error('Error comparing passwords: ' + error.message);
        }
    }

    static validatePasswordStrength(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?+-=_":{}|<>]/.test(password);

        if (password.length < minLength) {
            return {
                isValid: false,
                message: `Password must be at least ${minLength} characters long`
            };
        }

        if (!hasUpperCase) {
            return {
                isValid: false,
                message: 'Password must contain at least one uppercase letter'
            };
        }

        if (!hasLowerCase) {
            return {
                isValid: false,
                message: 'Password must contain at least one lowercase letter'
            };
        }

        if (!hasNumbers) {
            return {
                isValid: false,
                message: 'Password must contain at least one number'
            };
        }

        if (!hasSpecialChar) {
            return {
                isValid: false,
                message: 'Password must contain at least one special character'
            };
        }

        return {
            isValid: true,
            message: 'Password is strong'
        };
    }
}

module.exports = PasswordUtils;
