import fs from 'fs';
import path from 'path';
import multer from 'multer';

// Menentukan direktori penyimpanan file
const uploadDir = path.join('uploads');

// Memastikan folder 'uploads' ada, jika tidak maka buat folder tersebut
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Menentukan storage tempat penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);  // Menyimpan di folder 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Menyimpan file dengan nama unik
  }
});

// Menetapkan storage di multer
const upload = multer({ storage: storage });

export default upload;
