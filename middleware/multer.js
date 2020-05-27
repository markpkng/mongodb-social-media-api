const path = require("path");
const multer = require("multer");

module.exports = (folderName) => {
    return multer({
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            if (
                ext !== ".gif" &&
                ext !== ".jpg" &&
                ext !== ".jpeg" &&
                ext !== ".png"
            ) {
                return cb(
                    new Error(
                        "Invalid file extension. It must be .gif, .jpg, .jpeg, or .png"
                    )
                );
            }
            cb(null, true);
        },
        dest: `public/uploads/${folderName}`,
    });
};
