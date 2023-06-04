const { JWT } = require('jwt-auth-helper');

const jwt = new JWT(process.env.JWT_SECRET_KEY || 'JWT_SECRET_KEY');

const hasRole = (role = 'USER') => {
  return async (req, _, next) => {
    try {
      // Check middleware chaining
      if (!req.isAuth || !req?.user) {
        req.isAuth = false;
        const error = new Error('Unauthenticated');
        error.status = 401;
        return next(error);
      }

      if (req?.user && req?.user[role] == role) {
        req.isAuth = true;
        req.user = req.user;
        return next();
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = hasRole;
