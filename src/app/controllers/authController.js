 const express = require('express'),
       { User }  = require('../models/bdModel'),
       bcrypt = require('bcryptjs'),
       jwt = require('jsonwebtoken'),
       authConfig = require('../../config/auth.json')
       router = express.Router()

       function genereteToken(params = {}){
          return  jwt.sign(params, authConfig.secret, {
                  expiresIn: 86400,
            })
       }

router.post('/register', async (req, res) =>{
      const  { email } = req.body
      try {
            if(await User.findOne({ email }))
              return res.status(400).send({ error: 'The user already exists.' })
            
              const user = await User.create(req.body)

              user.password = undefined

            return res.send({
                  user,
                  token : genereteToken({ id: user.id })
            })
      } catch(err){
            console.log(err);
            
            return res.status(400).send({error: 'Register Failed'})
      }
});

router.post('/authenticate', async (req, res)=>{
      const {email, password} = req.body
      const user = await User.findOne({ email }).select('+password')

      if(!user)
            return res.status(400).send({ error: 'User not Foud.' })
      if( !await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: 'Invalid Password.' })
      user.password = undefined


      res.send({
            user,
            token : genereteToken({id: user.id })
      })
})

module.exports = app => app.use('/auth', router)