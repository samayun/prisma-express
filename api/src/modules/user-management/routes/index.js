const config = require('../../../config');
const { registerValidator } = require('../user.validator');
const { UserService } = require('../services/users.service');
const { prisma } = require('../../../database/connection');

module.exports = () => {
  const path = '/v1/users';
  const router = require('express').Router();
  const userService = new UserService();

  router.post('/create', registerValidator, async (req, res, next) => {
    /* 	#swagger.tags = ['user-management']
        #swagger.description = 'Endpoint to sign up a specific user' */
    try {
      const user = await prisma.user.create({ data: req.body });

      res.json({ success: true, message: `${user.name} created successfully`, data: user });
    } catch (error) {
      next(error);
    }
  });

  router.get('/view/:userId', async (req, res, next) => {
    // #swagger.tags = ['user-management']
    try {
      const user = await prisma.user.findFirst({ where: { id: req.params.userId } });

      res.json({ success: true, message: `Get User`, data: user });
    } catch (error) {
      next(error);
    }
  });

  router.get('/users', async (req, res, next) => {
    // #swagger.tags = ['user-management']
    try {
      const data = await userService.getUsers();

      res.json({ success: true, message: `Get all users`, data });
    } catch (error) {
      next(error);
    }
  });

  router.get('/update/:userId', async (req, res, next) => {
    // #swagger.tags = ['user-management']
    try {
      const updatedUser = await prisma.user.update({
        where: { id: req.params.userId },
        data: req.body,
      });

      res.json({ success: true, message: `updated user`, data: updatedUser });
    } catch (error) {
      next(error);
    }
  });

  router.get('/delete/:userId', async (req, res, next) => {
    // #swagger.tags = ['user-management']
    try {
      const deleteUser = await prisma.user.delete({ where: { id: req.params.userId } });

      res.json({ success: true, message: `Delete user`, data: deleteUser });
    } catch (error) {
      next(error);
    }
  });

  return { path, router };
};
