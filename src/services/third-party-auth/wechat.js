import axios from "axios";
import { AppError } from '../../errors';

const WECHAT_APP_ID = process.env.WECHAT_APP_ID || "";
const WECHAT_APP_SECRET = process.env.WECHAT_APP_SECRET || "";
const WECHAT_BASIC_URL = `https://api.weixin.qq.com/sns/jscode2session?appid=${WECHAT_APP_ID}&secret=${WECHAT_APP_SECRET}`;

export async function wxThirdPartyLogin(code) {
  try {
    const response = await axios.get(`${WECHAT_BASIC_URL}&js_code=${code}&grant_type=authorization_code`);

    if (response.data.errcode) {
			throw new AppError(`微信登录失败: ${response.data.errmsg}`, 401);
    }
		return response.data;
  } catch (error) {
    // 统一处理第三方请求失败（如网络错误、服务挂了等）
    if (err.response) {
      // 第三方返回了错误响应
      throw new AppError(`第三方认证失败: ${err.response.data.message || '未知错误'}`, 401);
    } else if (err.request) {
      // 请求发出但没响应
      throw new AppError('无法连接到认证服务器', 503);
    } else {
      // 其他错误
      throw new AppError('认证过程出现未知错误', 500);
    }
  }
}
