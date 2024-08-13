/*const Service = require("../models/service-model");


const service = async (req,res)=>{
    try{
    
const response = await Service.find();
if(!response){
    response.status(404).json({msg:"No service found"});
    return ;
}
res.status(200).json({msg: response});

    }catch(error){
console.log(`services ${error}`);
    }

};

module.exports = service;*/


const Service = require("../models/service-model");

const getService = async (req, res) => {
  try {
    const response = await Service.find();
    if (response.length === 0) {
      return res.status(404).json({ msg: "No service found" });
    }
    res.status(200).json(response); // Send the service data directly
  } catch (error) {
    console.error(`Error in service controller: ${error}`);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getService
};

