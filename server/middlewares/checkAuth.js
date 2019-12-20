const jwt = require('jsonwebtoken');

//models import
const User = require('../models/user');

module.exports = async(req, res, next) => {
 
    try{
      
        const token = req.headers.authorization.split(" ")[1]; //accessing after bearer i.e bearer token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // calcuelte expreide or not and make new tokan and refreshtoken here.
        // also set new tokena and refreshtoken to DB and then hit the next()
        req.userData = decoded;

        const user = await User.find({ _id : req.userData._id});

        if(user.length === 0) {
            return res.status(409).json({
                message: "Auth failed.",
                log: "id donot exist or  not a verified user"
            })
        }

        next();

    }catch(error){
        return res.status(401).json({
            message : 'Auth failed',
            log: "Permission denied"
        });
        
    }
}
