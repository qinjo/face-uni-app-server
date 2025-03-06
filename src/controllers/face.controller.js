import { FaceService } from '../services/face.service.js';

const faceService = new FaceService();

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: '没有上传文件' });
      return
    }
    const result = await faceService.saveImage(req.file);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: '上传失败' });
  }
};

export const analyzeImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      res.status(400).json({ error: '缺少图片URL' });
      return
    }

    const result = await faceService.analyzeFace(imageUrl);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: '分析失败' });
  }
};