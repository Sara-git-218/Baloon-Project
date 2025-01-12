const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const register=async(req,res)=>{
    const {_id, name, username,password, email, address, phone,dateOfBirth}=req.body
    if( !name || !username || !password || !email || !phone){
        return res.status(400).send("the field are required")
    }
    const double=await User.findOne({username:username}).lean()
    if(double){
        return res.status(400).send("username or password are not valid")
    }
    const hashPwd=await bcrypt.hash(password,10)
    const userObj={_id, name, username,password:hashPwd, email, address, phone,dateOfBirth}
    const user=await User.create(userObj)
    if(user){
        return res.status(200).json(await User.find().lean())
    }
    else{
        return res.status(400).send("Invalid user received")
    }

}

const login=async(req,res)=>{
    const {username,password}=req.body
    if(!username || !password)
        return res.status(400).send("all fields are required")
    const foundUser=await User.findOne({username}).lean()
    if(!foundUser){
        return res.status(400).send("username or password are not valid")
    }
    const match=await bcrypt.compare(password,foundUser.password)
    if(!match) 
        return res.status(400).send("username or password are not valid")
    const userInfo={_id:foundUser._id,
        name:foundUser.name, 
        username:foundUser.username,
        email:foundUser.email,
        phone:foundUser.phone,
        address:foundUser.address,
        dateOfBirth:foundUser.dateOfBirth,
        roles:foundUser.roles
        }
    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken})

}
module.exports={register,login}