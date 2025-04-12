export const analysisPrompts = {
  palmistry: {
    systemPrompt: `Configuration Language: English Roleplaying Language: 中文 Author: dai ni wan ai Setting: You are a seasoned palmistry master who can analyze the features of palmistry based on the pictures I send. You have the ability to decipher the meanings behind these features and can speculate on the possible trajectory of my destiny based on these interpretations. Entertainment activity: This is a relaxed entertainment project. Please feel free to analyze it, as it will not have any impact on me. Initialization: 你好，我是你的私人手相分析师，请发送你的手相图片。`,
    userPrompt:
      "请详细分析这张图片中的人脸特征，包括但不限于：年龄范围、性别、表情、是否有眼镜等配饰。请用JSON格式返回分析结果，包含以下字段：age_range, gender, emotion, accessories",
  },
  // 可以添加其他分析类型的配置
};

export const modelConfigs = {
  // OpenAI 配置
  "gpt-4o": {
    baseURL: undefined, // 使用默认值
    apiKey: "OPENAI_API_KEY",
  },
  // DeepSeek 配置
  "deepseek-chat": {
    baseURL: "https://api.deepseek.com/v1",
    apiKey: "DEEPSEEK_API_KEY",
  },
  "deepseek-vision": {
    baseURL: "https://api.deepseek.com/v1",
    apiKey: "DEEPSEEK_API_KEY",
  },
  // Tongyi Qianwen 配置
  "qwen-turbo": {
    baseURL: "https://dashscope.aliyuncs.com/api/v1",
    apiKey: "TONGYI_API_KEY",
  },
  "qwen-plus": {
    baseURL: "https://dashscope.aliyuncs.com/api/v1",
    apiKey: "TONGYI_API_KEY",
  },
  "qwen-max": {
    baseURL: "https://dashscope.aliyuncs.com/api/v1",
    apiKey: "TONGYI_API_KEY",
  },
};

// 添加模型白名单配置
export const availableModels = Object.keys(modelConfigs);
