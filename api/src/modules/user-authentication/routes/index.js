const config = require('../../../config');

const { JWT } = require('jwt-auth-helper');
const router = require('express').Router();
const { AuthService } = require('../../../app/services/auth.service');

const authenticate = require('../../../app/middlewares/isAuth');
const { registerValidator, loginValidator } = require('../auth.validator');

const UserModel = require('../../../database/models/User.model');

const jwt = new JWT(config.auth.jwtSecret);

const authService = new AuthService(UserModel);

const path = '/v1/auth';

module.exports = () => {
  router.post('/login', loginValidator, async (req, res, next) => {
    /* 
      #swagger.tags = ['Authentication']
      #swagger.description = 'Sign in a specific user'
     */
    try {
      const user = await authService.login({
        email: req.body.email,
        password: req.body.password,
      });

      const accessToken = await jwt.generateJWTToken({ ...user });

      req.session.user = user;

      req.cookies.user = user;

      res.json({
        success: true,
        message: `${user.name} logged in successfully`,
        data: {
          user,
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/register', registerValidator, async (req, res, next) => {
    /* 	#swagger.tags = ['Authentication']
        #swagger.description = 'Endpoint to sign up a specific user' */
    try {
      const user = await authService.register(req.body);

      req.session.user = user;

      req.cookies.user = user;

      const accessToken = await jwt.generateJWTToken({ ...user });

      res.json({ success: true, message: `${user.name} register successfully`, data: accessToken });
    } catch (error) {
      next(error);
    }
  });

  router.get('/profile', authenticate, async (req, res, next) => {
    // #swagger.tags = ['Authentication']
    try {
      const data = await authService.profile(req.session.user.email);

      res.json({ success: true, message: `Auth profile`, data });
    } catch (error) {
      next(error);
    }
  });

  router.get('/users', async (req, res, next) => {
    // #swagger.tags = ['Authentication']
    try {
      const data = await authService.getUsers();

      res.json({ success: true, message: `Get all users`, data });
    } catch (error) {
      next(error);
    }
  });

  router.post('/logout', async (req, res, next) => {
    /* 
      #swagger.tags = ['Authentication']
     */
    try {
      req.session.destroy();

      res.json({
        success: true,
        message: `logout successfully`,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  });

  return { path, router };
};
