const jwt = require('jsonwebtoken');

// Use a fallback secret if JWT_SECRET is not set in environment
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-in-production';

const authenticateToken = (req, res, next) => {
  // Try to get token from cookies first, then from Authorization header as fallback
  const token = req.cookies.accessToken || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
  
  if (!token) {
    return res.status(401).json({ 
      message: 'Access token required',
      error: 'MISSING_TOKEN'
    });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
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
      return res.status(401).json({ 
        message: 'Authentication required',
        error: 'UNAUTHENTICATED'
      });
    }
    
    if (req.user.role !== role) {
      return res.status(403).json({ 
        message: 'Insufficient permissions',
        error: 'FORBIDDEN'
      });
    }
    
    next();
  };
}

module.exports = { 
  authenticateToken, 
  requireRole, 
};