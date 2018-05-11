const mongoose = require('../../database')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

function valEmail(email) {
    return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
}

/*
 * Schema User.
 */
const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email:{
    type: String,
    unique: true,
    require:true,
    lowercase:true,
    validate: {
        isAsync: true,
        validator: valEmail
    },
  },
  password:{
    type: String,
    requere: true,
    select: false,
  },
  createdAt:{
    type: Date,
    default:Date.now,
  },
})
/*
 * Schema Contacts.
 */
const ContactSchema = Schema({
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
        validator: valEmail
      },
    },
    phone:{
        type: String,
        validate: {
            isAsync: true,
            validator: function(v, cb) {
                setTimeout(function() {
                    const vPhone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
                    cb(vPhone.test(v))
                }, 2)
            }
        },
        require: true,
    },
    dateOfBirth: {
        type: String,
        min: 10,
        max: 10,
        require: true,
    },
    userCreate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })

UserSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

next()
})

const User = mongoose.model('User', UserSchema, 'users')
const Contact = mongoose.model('Contact', ContactSchema, 'contacts')
module.exports = {
    User, Contact,
}