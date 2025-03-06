import { uploadImage, analyzeImage } from "../controllers/face.controller.js";
import multer from "multer";
import path from "path";
import { createProtectedRouter } from '../utils/route.utils.js';

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});
const upload = multer({storage});

export default createProtectedRouter(
  // 公开路由（如果有的话）
  [],
  // 受保护路由
  [
    { 
      method: 'POST', 
      path: '/upload', 
      handler: [upload.single("image"), uploadImage] 
    },
    { 
      method: 'POST', 
      path: '/analyze', 
      handler: analyzeImage 
    }
  ]
);
