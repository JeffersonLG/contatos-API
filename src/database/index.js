const mongoose = require('mongoose'),
      { user, pass} = require('../config/db.json')

mongoose.connect(`mongodb://${user}:${pass}@ds113200.mlab.com:13200/contactsapp`)
//mongoose.connect(`mongodb://127.0.0.1:27017/contactsapp`)

mongoose.Promise = global.Promise

module.exports = mongoose

