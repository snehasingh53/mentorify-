const adminMiddleware = async (req, res, next) => {
    try {
     
      
  
      const adminRole = req.user.isAdmin;
  
      if (!adminRole) {
        return res.status(403).json({ error: "Access denied. User is not an admin." });
      }
  
    //if user is an admin proceed to the get middleware
      next();
    } catch (error) {
     
      next(error);
    }
  };
  
  module.exports = adminMiddleware;
  