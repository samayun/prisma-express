/* eslint-disable class-methods-use-this */
const { BCrypt } = require('jwt-auth-helper');
const { prisma } = require('../../database/connection');

class AuthService {
  async register(params) {
    const { name, email, password } = params;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) throw new Error('User already exists, please login now 😢');

    const hashedPassword = await BCrypt.makeHash(password);

    const data = {
      name,
      email,
      password: hashedPassword,
      role: 'USER',
    };

    const user = await prisma.user.create({ data });

    delete user.password;

    return user;
  }

  async login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error('There has no found user with this credential 😢');

    const doesMatch = await BCrypt.compareHash(password, user.password);

    if (!doesMatch) throw new Error('Password is incorrect 😢');

    delete user.password;

    return user;
  }

  async profile(userId) {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  async getUsers() {
    try {
      const users = await prisma.user.findMany();
      // const users = await this.Model.find();

      return users;
    } catch (error) {
      return [];
    }
  }

  async userByEmail(userId) {
    return prisma.user.findFirst({ where: { id: userId } });
  }

  async updateUser(userId, data) {
    const updatedUser = await req.prisma.post.update({
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

module.exports = { AuthService };
