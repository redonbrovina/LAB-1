const jwt = require('jsonwebtoken');

// Use a fallback secret if JWT_SECRET is not set in environment
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-in-production';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    console.log('No token provided in request');
    return res.status(401).json({ 
      message: 'Access token required',
      error: 'MISSING_TOKEN'
    });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err.message);
      return res.status(401).json({ 
        message: 'Invalid or expired token',
        error: 'INVALID_TOKEN'
      });
    }
    
    req.user = user;
    next();
  });
};

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      console.log('No user found in request');
      return res.status(401).json({ 
        message: 'Authentication required',
        error: 'UNAUTHENTICATED'
      });
    }
    
    if (req.user.role !== role) {
      console.log(`User role '${req.user.role}' does not match required role '${role}'`);
      return res.status(403).json({ 
        message: 'Insufficient permissions',
        error: 'FORBIDDEN'
      });
    }
    
    console.log(`Role '${role}' verified for user:`, req.user);
    next();
  };
}

module.exports = { 
  authenticateToken, 
  requireRole, 
};