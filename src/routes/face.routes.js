import { Router } from "express";
import { uploadImage, analyzeImage } from "../controllers/face.controller.js";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // 获取原始后缀(.jpg)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // 合成新文件名：时间戳+随机数+后缀
    cb(null, `${uniqueSuffix}${ext}`);
  },
});
const upload = multer({storage});

router.post("/upload", upload.single("image"), uploadImage);
router.post("/analyze", analyzeImage);

export default router;
