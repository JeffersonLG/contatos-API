const express = require('express'),
      authMiddleware = require('../middleware/auth'),
      { Contact } = require('../models/bdModel'),
      router = express.Router()
      

router.use(authMiddleware)

router.get('/', async (req, res)=>{
    try {
        const contacts = await Contact.find().populate('user')

        return res.send({ contacts })
    } catch (err) {
        return res.status(400).send({ error: 'Error fetching Contacts.' })
    }
})

router.get('/:contactId', async (req, res)=>{
    try {
        const contacts = await Contact.findById(req.params.contactId).populate('user')

        return res.send({ contacts })
    } catch (err) {
        return res.status(400).send({ error: 'Error fetching Contact.' })
    }
})

router.post('/', async (req, res) => {
    const { email } = req.body
    try{
        if(await Contact.findOne({ email }))
        return res.status(400).send({ error: 'Contact already exists.' })

        const contact = await Contact.create({ ...req.body, userCreate: req.userId })

        return res.send({ contact })
    } catch (err){
        return res.status(400).send({ error: 'Erro create new product.' })
    }
})

router.put('/:contactId', async (req, res)=>{
    try{
        const { name, email } = req.body

        const contact = await Contact.findByIdAndUpdate( req.params.contactId, {
            name, 
            email
        }, { new: true })

        await contact.save()

        return res.send({ contact })
    } catch (err){
        return res.status(400).send({ error: 'Erro Updating product.' })
    }
})

router.delete('/:contactId', async (req, res)=>{
    try {
        const contacts = await Contact.findByIdAndRemove(req.params.contactId)

        return res.send({ ok: 'Deleted contact.' })
    } catch (err) {
        return res.status(400).send({ error: 'Error Remove Contact.' })
    }
})

module.exports = app => app.use('/contacts', router)