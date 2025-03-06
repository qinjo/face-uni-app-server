import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const createProtectedRouter = (publicRoutes = [], protectedRoutes = []) => {
  const router = Router();

  // 注册公开路由
  publicRoutes.forEach(({ method, path, handler }) => {
    router[method](path, handler);
  });

  // 创建受保护的路由
  const protectedRouter = Router();
  protectedRouter.use(authMiddleware);
  
  // 注册受保护路由
  protectedRoutes.forEach(({ method, path, handler }) => {
    protectedRouter[method](path, handler);
  });

  // 将受保护路由添加到主路由
  router.use(protectedRouter);

  return router;
};