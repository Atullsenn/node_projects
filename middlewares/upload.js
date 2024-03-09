const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname, '../public/uploads'))
    },

    filename:(req,file,cb)=>{
        let filename = Date.now() + '-' + file.originalname
        cb(null, filename)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

exports.upload = multer({storage:storage, fileFilter: fileFilter})