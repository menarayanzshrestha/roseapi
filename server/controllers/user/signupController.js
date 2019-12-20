const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const User = require('../../models/user');
const UserDetails = require('../../models/userDetails');

//import validation schema 
const signupSchema = require('../../validators/userValidators/signupSchema');

//import validator
const { validator }= require('../../validators/index');

module.exports = async(req, res) => {

    try {

        //Validation start
        const validationError = validator(req.body, signupSchema);

        if(validationError){
            return res.status(400).json({
                message: validationError
            })
        }
        //Validation end

        const {
            email,
            password,
            fullName
        } = req.body;

        const isUserExist = await User.find({ email });

        if(isUserExist.length > 0) {
            return res.status(409).json({
                message: "Email already existed"
            })
        }

        var hash = bcrypt.hashSync(password, saltRounds);

        var _id = new mongoose.Types.ObjectId;

        const newUser = new User({
            _id,
            email,
            password : hash
        })

        const newUserDetail = new UserDetails({
            _id : mongoose.Types.ObjectId(),
            userId : _id,
            fullName
        })

        newUser.profileId = newUserDetail._id;

        const newUserStatus = await newUser.save();

        const newUserDetailStatus = await newUserDetail.save();

        if(newUserStatus && newUserDetailStatus){
            res.status(200).json({
                message: "New User created successfully"
            })
            
        }else {
            res.status(409).json({
                message: "Failed to create new user."
            })
        }

    }catch(err) {

        console.log(err);
        res.status(500).json({
            message: err.message
        })

    }
}