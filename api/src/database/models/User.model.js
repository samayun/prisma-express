const { Schema, model } = require('mongoose');

const modelSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },

    role: {
      type: String,
      default: 'USER',
    },
  },
  { timestamps: true },
);

const UserModel = model('User', modelSchema);

modelSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = UserModel;
