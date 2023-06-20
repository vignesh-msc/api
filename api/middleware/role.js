  // Middleware function for role-based access control
  const checkUserRole = (role) => (req, res, next) => {
    const userRoles = getUserRoles(req.user.id); // Fetch user roles
  
    if (userRoles.includes(role)) {
      next(); // User has the required role, proceed to the next middleware/route handler
    } else {
      res.status(403).json({ error: 'Access denied' }); // User does not have the required role
    }
  };
  
  module.exports = checkUserRole;