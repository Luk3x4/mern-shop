const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const accessToken = req.headers?.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];
    if(!accessToken) return res.status(401).json({err: 'Unauthorized'});
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(401).json({err: 'Invalid Token'})
        req.user = user
        next()
    })
}

module.exports = authenticateToken