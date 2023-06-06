const { prisma } = require('../../../database/connection');

class UserService {
  async getUsers() {
    try {
      const users = await prisma.user.findMany();

      return users;
    } catch (error) {
      return [];
    }
  }

  async findUser(userId) {
    return prisma.user.findFirst({ where: { id: userId } });
  }

  async updateUser(userId, data) {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: data,
    });
    return updatedUser;
  }

  async deleteUser(userId) {
    const deleteUser = await prisma.user.delete({ where: { id: userId } });

    return deleteUser;
  }
}

module.exports = { UserService };
