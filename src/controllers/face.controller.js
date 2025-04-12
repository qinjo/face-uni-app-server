import { FaceService } from '../services/face.service.js';

const faceService = new FaceService();

export const uploadImage = async (req, res) => {
  try {
    console.log('uploadImage', req.file);
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
    console.log('analyzeImage', req.body);
    const { imageUrl, model } = req.body; // 接收模型参数
    const result = await faceService.analyzeFace(imageUrl, model); // 传递模型参数
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: '分析失败' });
  }
};