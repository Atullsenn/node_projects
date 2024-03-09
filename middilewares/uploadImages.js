const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },

    filename:(req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})


exports.uploads = multer({storage: storage});


exports.uploadMultipleImage = (req, res, next) =>{

    this.uploads.array('images', 10)(req, res, (err)=>{
        if(err){
            return res.status(400).json({
                error: err.message
            })
        }

        const files = req.files;
        const errors = [];

        // Validate FileType and File Sizes;
        files.forEach((file)=>{
            var ext = path.extname(file.originalname)
            const maxSize = 10 * 1024 * 1024;

            if(ext !== '.jpg' && ext !== '.png'){
                errors.push(`Invalid File Type : ${file.originalname}`)
            }

            if(file.size > maxSize){
                errors.push(`File Too Large : ${file.originalname}`)
            }
        })

         // Handle validation errors
      if (errors.length > 0) {
        // Remove uploaded files
        files.forEach((file) => {
          fs.unlinkSync(file.path);
        });
  
        return res.status(400).json({ errors });
      }
  
      // Attach files to the request object
      req.files = files;
  
      // Proceed to the next middleware or route handler
      next();
    })

}