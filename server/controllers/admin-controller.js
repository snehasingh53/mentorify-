const User = require("../models/user-model");
const Contact = require("../models/contact-model");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    next(error); // Pass error to next middleware for handling
  }
};
// single user logic 
const getUserById =async(req,res)=>{
  try{
    const id=req.params.id;
   const data = await User.findOne({_id:id},{password:0});
     return res.status(200).json(data);
  }catch(error){
    console.log(error);
  }
}
// user update logic

const updateUserById= async(req,res)=>{
  try{
    const id = req.params.id;
    const updatedData = req.body;

    const updateUser = await User.updateOne({_id:id}, {
      $set:updatedData,
    })

    return res.status(200).json(updatedData);
  }catch(error){
    console.log(error);

  }

}


//user delete logic
const deleteUserById =async(req,res)=>{
  try{
    const id=req.params.id;
    await User.deleteOne({ _id:id });
     return res.status(200).json({message:"User Deleted Successfully"});
  }catch(error){
    next(error);
  }

};


//getAllContacts logic 
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error); // Pass error to next middleware for handling
  }
};

//delete contact 

const deleteContactById = async (req, res) => {
  try {
      const id = req.params.id;
      await Contact.deleteOne({ _id: id });
      return res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
      next(error);
  }
};

module.exports = { getAllUsers, getAllContacts ,deleteUserById , getUserById, updateUserById,deleteContactById};
