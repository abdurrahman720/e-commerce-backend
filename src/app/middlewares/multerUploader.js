import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix +'-'+ file.originalname)
    }

})

const uploader = multer({
  storage: storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /png|jpg/;
        const extension = path.extname(file.originalname);

        if (supportedImage.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error("Must be a png/jpg image"))
        }
    },
    limits: {
        fileSize: 5000000,
    }
})

export default uploader;