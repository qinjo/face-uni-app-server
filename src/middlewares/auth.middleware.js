import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('token', token);
    if (!token) {
      return res.status(401).json({ error: '未提供认证token' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // 将解码后的用户信息添加到请求对象中
    next();
  } catch (error) {
    res.status(401).json({ error: 'token无效或已过期' });
  }
};