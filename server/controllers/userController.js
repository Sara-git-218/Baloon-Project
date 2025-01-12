const User=require("../models/User")

const deleteUser=async(req,res)=>{
    const {_id}=req.body
    const user=await User.findById(_id)
    if(!user){
        return res.status(400).send("user not found")
    }
    const result=await user.deleteOne()
    res.json(await User.find().lean())
}

const getAllUsers=async(req,res)=>{
    const users=await User.find().lean()
    if(!users){
        return res.status(400).send("No users found")
    }
    res.json(users)

}

const getById=async(req,res)=>{
    const {id}=req.params
    const user=await User.findById(id).lean()
    if(!user){
        return res.status(400).send("User not found")
    }
    res.json(user)
}

const updateUserById=async(req,res)=>{
    const {_id, name, username,password, email, address, phone,dateOfBirth} = req.body
    if(!_id){
        return res.status(400).send("_id is requiered")
    }
    const user=await User.findById(_id)
    if(!user){
        return res.status(400).send("user not found")
    }
    user.name=name
    user.username=username
    user.password=password
    user.email=email
    user.address=address
    user.phone=phone
    user.dateOfBirth=dateOfBirth
    
    const updatedUser=await user.save()
    res.json(await User.find().lean())
}

module.exports={getAllUsers,deleteUser,updateUserById,getById}