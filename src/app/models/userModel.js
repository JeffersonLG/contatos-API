const mongoose = require('../../database')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

function valEmail(email) {
  return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
};

/*
 * Schema User.
 */
const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require:true,
    lowercase:true,
    validate: {
        isAsync: true,
        validator: valEmail,
    },
  },
  password: {
    type: String,
    requere: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default:Date.now,
  },
});

UserSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;