import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const createProtectedRouter = (publicRoutes = [], protectedRoutes = []) => {
  const router = Router();

  // 注册公开路由
  publicRoutes.forEach(({ method, path, handler }) => {
    const httpMethod = method.toLowerCase(); // 确保方法名是小写
    if (Array.isArray(handler)) {
      router[httpMethod](path, ...handler);
    } else {
      router[httpMethod](path, handler);
    }
  });

  // 注册受保护路由
  protectedRoutes.forEach(({ method, path, handler }) => {
    const httpMethod = method.toLowerCase(); // 确保方法名是小写
    if (Array.isArray(handler)) {
      router[httpMethod](path, authMiddleware, ...handler);
    } else {
      router[httpMethod](path, authMiddleware, handler);
    }
  });

  return router;
};