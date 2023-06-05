/* eslint-disable class-methods-use-this */
const { prisma } = require('../../database/connection');

class TestService {
  async create(params) {
    const test = await prisma.user.create({ data: params });
    return test;
  }

  async findMany() {
    return prisma.user.findMany();
  }

  async update(id, params) {
    return prisma.user.findFirst({ where: { id } });
  }

  async delete(id) {
    return prisma.user.findFirst({ where: { id } });
  }
}

module.exports = { TestService };
