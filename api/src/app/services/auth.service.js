/* eslint-disable class-methods-use-this */
const { BCrypt } = require('jwt-auth-helper');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AuthService {
  constructor(Model) {
    this.Model = Model;
  }

  async register(params) {
    const { name, email, password } = params;

    const existingUser = await this.Model.findOne({ email });

    if (existingUser) throw new Error('User already exists, please login now 😢');

    const hashedPassword = await BCrypt.makeHash(password);

    const credentials = {
      name,
      email,
      password: hashedPassword,
    };

    const user = await this.Model.create(credentials);

    delete user.password;

    return user.toObject();
  }

  async login({ email, password }) {
    const existingUser = await this.Model.findOne({ email });

    const user = existingUser?.toObject();

    if (!user) throw new Error('There has no found user with this credential 😢');

    const doesMatch = await BCrypt.compareHash(password, user.password);

    if (!doesMatch) throw new Error('Password is incorrect 😢');

    delete user.password;

    return user;
  }

  async profile(email) {
    return this.Model.findOne({ email });
  }

  async getUsers() {
    const users = await prisma.user.findMany();
    console.log(users);
    return users;
  }
}

module.exports = { AuthService };
