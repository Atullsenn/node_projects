const multer = require('multer');
const path = require('path');

const imageUpload = (fileName)=>{

    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, path.join(__dirname, '../public/images'))
        },

        filename: function(req, file, cb){
            const name = Date.now() + '-' + file.originalname;
            cb(null, name)
        }
    })

    const fileFilter = (req, file, cb)=>{
        (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') ? cb(null, true) : cb(null, false)
    }

    const upload = multer({
            storage: storage,
            fileFilter: fileFilter
        });

        return upload.single(fileName)

}


module.exports = imageUpload;

