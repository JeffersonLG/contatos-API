const express = require('express'),
      authMiddleware = require('../middleware/auth'),
      { User } = require('../models/bdModel')
      router = express.Router()
      

router.use(authMiddleware)

router.get('/', async (req, res)=>{
    try {
        const users = await User.find()

        return res.send({ users })
    } catch (err) {
        return res.status(400).send({ error: 'Error fetching Users.' })
    }
})
router.get('/:userId', async (req, res)=>{
    try {
        const user = await User.findById(req.params.userId)

        return res.send({ user, userOn: req.userId})
    } catch (err) {
        return res.status(400).send({ error: 'Error fetching User.' })
    }
})

module.exports = app => app.use('/users', router)