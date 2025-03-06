import { wxLogin, updateUserInfo, checkToken } from '../controllers/user.controller.js';
import { createProtectedRouter } from '../utils/route.utils.js';

export default createProtectedRouter(
    // 公开路由
    [
      { method: 'POST', path: '/wxLogin', handler: wxLogin }
    ],
    // 受保护路由
    [
      { method: 'POST', path: '/updateInfo', handler: updateUserInfo },
      { method: 'GET', path: '/checkToken', handler: checkToken }
    ]
  );

