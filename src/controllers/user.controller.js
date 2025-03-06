import { UserService } from '../services/user.service.js';

const userService = new UserService();

export const wxLogin = async (req, res) => {
  try {
    const { code, userInfo } = req.body;
    
    if (!code) {
      res.status(400).json({ error: '缺少微信登录code' });
      return;
    }

    const result = await userService.wxLogin(code, userInfo);
    if (!result.success) {
      res.status(401).json({ error: result.message });
      return;
    }

    res.json({
      token: result.token,
      user: result.user,
      isNewUser: result.isNewUser
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ error: '登录失败' });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { openid } = req.user;
    const userInfo = req.body;

    const result = await userService.updateUserInfo(openid, userInfo);
    if (!result.success) {
      res.status(400).json({ error: result.message });
      return;
    }

    res.json({
      message: '用户信息更新成功',
      user: result.user
    });
  } catch (error) {
    res.status(500).json({ error: '更新用户信息失败' });
  }
};

export const checkToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ error: '未提供token' });
      return;
    }

    const result = await userService.checkToken(token);
    if (!result.success) {
      res.status(401).json({ error: result.message });
      return;
    }

    res.json({ 
      valid: true,
      user: result.user 
    });
  } catch (error) {
    res.status(500).json({ error: 'token验证失败' });
  }
};