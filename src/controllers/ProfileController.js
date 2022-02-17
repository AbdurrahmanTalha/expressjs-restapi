const ProfileModel = require("../models/ProfileModel");
const jwt = require('jsonwebtoken');

exports.CreateProfile = (req, res) => {
    let reqBody = req.body;
    ProfileModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({status:'fail',data:err})
            
        } else {
            res.status(200).json({ status: 'success', data: data })
        }
    });
    
}
exports.UserLogin = (req, res) => {
  
    let UserName = req.body['UserName'];
    let Password = req.body['Password'];
    ProfileModel.find({ UserName: UserName, Password: Password }, (err, data) => {
        if (err) {
            res.status(401).json({ status: "Unauthorized" })
        } else {
            if (data.length > 0) {
                // Create Auth Token
                let payload = {
                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                    data:data[0]
                }
                let token = jwt.sign(payload, 'secret');
                res.status(200).json({ status: "Success",token:token, data: data[0] })
            } else {
                res.status(401).json({ status: "Unauthorized" })
            } 
            
        }
   
   })
    
}