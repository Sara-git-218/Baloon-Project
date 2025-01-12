const jwt=require("jsonwebtoken")
const verifyJWT=(req,res,next)=>{
    const authH=req.headers.authorization || req.headers.Authorization
    if(!authH?.startsWith("Bearer ")){
        res.status(401).send("Unauthorized")
    }
    const token=authH.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err){
                return res.status(403).send("Unauthorized")
            }
            req.user=decoded
            next()
        }
    )

}
module.exports = verifyJWT