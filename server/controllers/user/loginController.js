const User = require('../../models/user');
var jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

//import validation schema 
const loginSchema = require('../../validators/userValidators/loginSchema');

//import validator
const { validator }= require('../../validators/index');

module.exports = async(req, res) => {

    try {


        //Validation start
        const validationError = validator(req.body, loginSchema);

        if(validationError){
            return res.status(400).json({
                message: validationError
            })
        }
        //Validation end

        const {
            email,
            password
        } = req.body;

        const userInfo = await User.find({ email });

        if(userInfo.length === 0) {
            return res.status(409).json({
                message: "Auth failed.",
                log: "User not exist or not a verified user."
            })
        }

        var comparision = bcrypt.compareSync(password, userInfo[0].password);

        if(!comparision) {
            return res.status(401).json({
                message : "Auth failed.",
                log : "Pwd incorrect."
            })
        }

        var token = jwt.sign(
            {
                _id : userInfo[0]._id,
                email : userInfo[0].email,
                role : userInfo[0].role,
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.TOKEN_EXPIRES_AT 
            }
        );

        res.status(200).json({
            message : "Success",
            token 
        })


    }catch(err) {

        console.log(err);
        res.status(500).json({
            message: err.message
        })

    }

}