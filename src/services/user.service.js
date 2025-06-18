import jwt from 'jsonwebtoken';
import { wxThirdPartyLogin } from './third-party-auth/wechat';

const JWT_SECRET = process.env.JWT_SECRET;
export class UserService {
  constructor() {
    this.users = [];
  }

  async wxLogin(code, userInfo) {
		console.log('wxLogin services code', code);
		const response = await wxThirdPartyLogin(code);
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