import OpenAI from "openai";
import { AnalysisService } from './analysis.service.js';
import fs from "fs";
import path from "path";

export class FaceService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.analysisService = new AnalysisService();
  }

  async saveImage(file) {
    console.log('saveImage', file);
    // 这里实现图片保存逻辑
    return {
      url: `/uploads/${file.filename}`,
      fileName: file.originalname,
      message: "图片上传成功",
    };
  }

  async analyzeFace(imageUrl, model = process.env.DEFAULT_MODEL) {
    try {
      const imagePath = path.join(process.cwd(), imageUrl.replace(/^\//, ""));
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString("base64");
      // 调用独立的分析服务
      return await this.analysisService.analyzeImage(base64Image, 'palmistry', model);
    } catch (error) {
      console.error("分析失败:", error);
      return {
        success: false,
        error: "图片处理失败"
      };
    }
  }
}
