/* eslint-disable class-methods-use-this */

class TestService {
  constructor(Model) {
    this.Model = Model;
  }

  async create(params) {
    const test = new this.Model(params);
    return test.save();
  }

  async findMany() {
    return this.Model.find({}).sort({ createdAt: -1 });
  }

  async update(id, params) {
    return this.Model.findByIdAndUpdate(id, params, { new: true });
  }

  async delete(id) {
    return this.Model.findByIdAndDelete(id);
  }
}

module.exports = { TestService };
