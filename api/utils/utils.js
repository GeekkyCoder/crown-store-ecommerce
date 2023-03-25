const jwt =  require("jsonwebtoken");

const MaxAge = 3 * 24 * 60 * 60

 function createToken(user){
    // returns a token 
    // takes 3 arguments sign(payload,secret,options)
   return jwt.sign({id:user.id},process.env.ACCESS_TOKEN,{
        expiresIn:MaxAge
    })

}

module.exports = {
    createToken
}