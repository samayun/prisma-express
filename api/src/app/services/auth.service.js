/* eslint-disable class-methods-use-this */
const { BCrypt } = require('jwt-auth-helper');

class AuthService {
  constructor(Model) {
    this.Model = Model;
  }

  async register(params) {
    const { name, email, password } = params;
    // check is user already exist
    const existingUser = await this.Model.findOne({ email });
    // if user not found show error
    if (existingUser) throw new Error('User already exists, please login now 😢');
    // hash password
    const hashedPassword = await BCrypt.makeHash(password);
    // save on database
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
    return this.Model.find({}).limit(50);
  }
}

module.exports = { AuthService };
