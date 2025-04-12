import OpenAI from "openai";
import { analysisPrompts, availableModels, modelConfigs } from "../config/analysis.config.js";

export class AnalysisService {

  getClientConfig(modelType) {
    const config = modelConfigs[modelType] || modelConfigs[process.env.DEFAULT_MODEL];
    return {
      baseURL: config.baseURL,
      apiKey: process.env[config.apiKey]
    };
  }

  async analyzeImage(imageBase64, analysisType = 'palmistry', modelType = process.env.DEFAULT_MODEL) {
    try {
      // 根据模型类型创建不同配置的客户端
      const client = new OpenAI(this.getClientConfig(modelType));
      console.log('analyzeImage client', client);
      // 验证模型可用性
      const model = availableModels[modelType] ? modelType : process.env.DEFAULT_MODEL;
      
      const { systemPrompt, userPrompt } = analysisPrompts[analysisType];
      
      const response = await client.chat.completions.create({
        model: model, // 使用动态模型
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: userPrompt },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
            ]
          }
        ],
        max_tokens: 500,
        response_format: { type: "json_object" }
      });

      return {
        success: true,
        analysis: JSON.parse(response.choices[0].message.content)
      };
    } catch (error) {
      console.error("分析失败:", error);
      return {
        success: false,
        error: error.response?.data?.error?.message || "图片分析服务暂时不可用"
      };
    }
  }
}