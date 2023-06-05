const { JWT } = require('jwt-auth-helper');

const jwt = new JWT(process.env.JWT_SECRET_KEY || 'JWT_SECRET_KEY');

const authenticate = async (req, res, next) => {
  // authorization : Bearer asjdgshjgfjhgfdajshg
  try {
    const token = req.headers?.authorization?.replace('Bearer ', '');

    console.log({ accessToken: req.cockie.accessToken });

    if (req.session.accessToken) return next();

    if (!token || token === null || token === '') {
      req.isAuth = false;

      const error = new Error('Unauthenticated');
      error.status = 401;
      return next(error);
    }

    const decodedAuthData = jwt.verifyToken(token);

    if (!decodedAuthData) {
      req.isAuth = false;
      const error = new Error('Token is malicious');
      error.status = 401;
      return next(error);
    }

    req.isAuth = true;
    req.user = decodedAuthData;
    return next();
  } catch (error) {
    next(error);
  }
};
module.exports = authenticate;
