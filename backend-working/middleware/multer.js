import multer from 'multer'

// Use memory storage for serverless-friendly uploads
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
