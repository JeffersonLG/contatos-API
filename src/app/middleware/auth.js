const jwt = require('jsonwebtoken'),
      authConfig = require('../../config/auth.json')
    
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader)
        return res.status(401).send({ error: 'No Token Provader' })

    
    const parts = authHeader.split(' ')

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token Error.' })
    
        

    const [ scheme, token] = parts
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' })

    
    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if(err) return res.status(401).send({ error: 'Token Invalid.' })

        req.userId = decoded.id

        return next()
    })
}