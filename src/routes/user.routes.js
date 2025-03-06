import { wxLogin, updateUserInfo, checkToken } from '../controllers/user.controller.js';
import { createProtectedRouter } from '../utils/route.utils.js';

export default createProtectedRouter(
    // 公开路由
    [
      { method: 'post', path: '/wxLogin', handler: wxLogin }
    ],
    // 受保护路由
    [
      { method: 'post', path: '/updateInfo', handler: updateUserInfo },
      { method: 'get', path: '/checkToken', handler: checkToken }
    ]
  );

