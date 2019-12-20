const sharp = require('sharp');

module.exports = async(req, res) => {

    try {

        if (req.files === null){
            return res.status(409).json({
                message: "No image found."
            });
        }

        let featureImage = req.files.featureImage;

        if (featureImage.truncated === true){
            return res.status(409).json({
                message: "Maximum limit for file upload is 2mb."
            });
        }

        if (featureImage.mimetype == 'image/jpeg'){

            await sharp(req.files.featureImage.data)            
            .rotate()
            .resize(200)            
            .toBuffer()            
            .then( newBuffer => { 

                req.files.featureImage.data = newBuffer;

                req.files.featureImage.mv(appRoot + '/uploads/images/'+ Date.now() + '.webp', function(err) { 
                    if (err) {                    
                        return res.status(500).send(err);                
                    }
                    res.status(200).send({
                        message: "Images successfully uploaded from jpg to .webp format"
                    });
                })
            })
            .catch( err => { console.log(err) });

            
        } else {
            console.log("File must be in jpeg format.");
            return res.status(409).json({
                message: "File must be in jpeg format."
            });
        }

    }catch(err) {

        console.log(err);
        res.status(500).json({
            message: err.message
        })

    }
}