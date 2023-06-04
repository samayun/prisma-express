const { TestService } = require('../tests.service');
const TestModel = require('../../../database/models/Test.model');

module.exports = () => {
  const path = '/v1/tests';
  const router = require('express').Router();
  const testService = new TestService(TestModel);

  router.get('/', async (req, res, next) => {
    try {
      /* #swagger.tags = ['.template'] */
      const data = await testService.findMany();

      return res.status(200).json({ success: true, message: 'Get all tests', data });
    } catch (error) {
      next(new Error(error.message));
    }
  });

  router.post('/', async (req, res, next) => {
    /* #swagger.tags = ['.template'] */
    try {
      const data = await testService.create({
        title: req.body.title,
      });

      return res.status(200).json({ success: true, message: 'create test', data });
    } catch (error) {
      next(new Error(error.message));
    }
  });

  router.put('/:id', async (req, res, next) => {
    /* #swagger.tags = ['.template'] */
    try {
      const data = await testService.update(req.params.id, {
        title: req.body.title,
      });

      return res.status(200).json({ success: true, message: 'update test', data });
    } catch (error) {
      next(new Error(error.message));
    }
  });

  router.delete('/:id', async (req, res, next) => {
    /* #swagger.tags = ['.template'] */
    try {
      const data = await testService.delete(req.params.id);

      return res.status(200).json({ success: true, message: 'delete test', data });
    } catch (error) {
      next(new Error(error.message));
    }
  });

  return { path, router };
};
