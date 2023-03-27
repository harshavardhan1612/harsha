const jwt = require('jsonwebtoken')


const authorization = async (req,res,next)=>{
    try {
        const token = req.headers.authorization
        if(!token){
            res.status(401).send({"msg": "Not Authorised"})
        }
        const isToken = await jwt.verify(token, "masai")
        if(!isToken){
            res.send({"msg": "Not Authorised"})
        }
        req.body.userId = isToken.userId
        next()
    } catch (error) {
        res.send({"msg":"something went wrong", error})
    }
}

module.exports = {
    authorization
}