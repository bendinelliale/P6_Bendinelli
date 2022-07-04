// Info: Use multer diskstorage to save images

// Requires
const multer = require('multer');
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

// Image filetypes
const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png'
  };

// Multer configuration
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images'); // Storage location
  },
		filename: (req, file, callback) => {
			let name = file.originalname.split(' ').join('_'); // Replaces spaces
			let extension = MIME_TYPES[file.mimetype]; // Get extention by MIME type
			name = name.replace("." + extension, "-"); // Replace dot
		callback(null, name + Date.now() + '.' + extension); // Sum up and adding unique timestamp
	  }
});

 // Storing single image
 module.exports = multer({
 storage: storage
 }).single('image');