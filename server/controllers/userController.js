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
const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id; // מהטוקן
  
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).send("יש להזין סיסמה תקינה");
    }
  
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("משתמש לא נמצא");
  
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).send("סיסמה נוכחית שגויה");
  
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
  
    res.send("סיסמה עודכנה בהצלחה");
  };
  
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

module.exports={getAllUsers,deleteUser,updateUserById,getById,changePassword}