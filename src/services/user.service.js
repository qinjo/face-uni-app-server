import jwt from 'jsonwebtoken';
import axios from 'axios';

const JWT_SECRET = process.env.JWT_SECRET;
const WECHAT_APP_ID = process.env.WECHAT_APP_ID || '';
const WECHAT_APP_SECRET = process.env.WECHAT_APP_SECRET || '';

export class UserService {
  constructor() {
    this.users = [];
  }

  async wxLogin(code, userInfo) {
    try {
      const wxLoginUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${WECHAT_APP_ID}&secret=${WECHAT_APP_SECRET}&js_code=${code}&grant_type=authorization_code`;
      const response = await axios.get(wxLoginUrl);
      
      if (response.data.errcode) {
        return { 
          success: false, 
          message: `微信登录失败: ${response.data.errmsg}` 
        };
      }

      const { openid, session_key, unionid } = response.data;

      // 查找或创建用户
      let user = this.users.find(u => u.openid === openid);
      let isNewUser = false;
      
      if (!user) {
        isNewUser = true;
        user = {
          id: Date.now().toString(),
          openid,
          unionid,
          sessionKey: session_key,
          lastLoginTime: new Date(),
          ...userInfo // 合并用户信息
        };
        this.users.push(user);
      } else {
        // 更新用户信息
        user.sessionKey = session_key;
        user.lastLoginTime = new Date();
        if (userInfo) {
          Object.assign(user, userInfo);
        }
      }

      const token = jwt.sign(
        { 
          userId: user.id, 
          openid: user.openid 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return {
        success: true,
        token,
        user: {
          id: user.id,
          nickName: user.nickName,
          avatarUrl: user.avatarUrl
        },
        isNewUser
      };
    } catch (error) {
      console.error('微信登录处理失败:', error);
      return {
        success: false,
        message: '登录处理失败'
      };
    }
  }

  async updateUserInfo(openid, userInfo) {
    const user = this.users.find(u => u.openid === openid);
    if (!user) {
      return { success: false, message: '用户不存在' };
    }

    Object.assign(user, userInfo);
    return {
      success: true,
      user: {
        id: user.id,
        nickName: user.nickName,
        avatarUrl: user.avatarUrl
      }
    };
  }

  async checkToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = this.users.find(u => u.openid === decoded.openid);
      return user ? { success: true, user } : { success: false, message: '用户不存在' };
    } catch (error) {
      return { success: false, message: 'token无效' };
    }
  }
}