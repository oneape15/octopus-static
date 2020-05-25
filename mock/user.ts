import { Request, Response } from 'express';
import { parse } from 'url';

import { UserListItem } from '@/models/user';
import { UserListParams } from '@/services/user';

let userListDataSource: UserListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  let roleList: string[] = [];
  const size = Math.ceil(Math.random() * 10);
  for (let j = 0; j < size; j++) {
    roleList.push(`${(j + 1) * 100}`)
  }
  userListDataSource.push({
    id: `${((i + 1) * 100)}`,
    nickname: `张三${i}`,
    userName: `user_${i}`,
    password: `pwd00${i}`,
    email: `zhang${i}@octoups.com`,
    roles: roleList,
    phone: `1570017453${i}`,
    lastLogin: `${i}天前`,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  });
}
// 插入管理员
userListDataSource.push({
  id: "1",
  nickname: '管理员',
  userName: 'admin',
  password: 'admin',
  email: 'oneape15@octoups.com',
  roles: [],
  phone: '157001744536',
  lastLogin: '1小时前',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
})

// 获取验证码
function getFakeCaptcha(req: Request, res: Response) {
  return res.json('captcha-xxx');
}

// 获取当前用户信息
function getCurrentUser(req: Request, res: Response) {
  return res.json({
    nickname: 'oneape15',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    id: '00000001',
    email: 'oneape15@octopus.com',
    signature: '平凡的人，做平凡的事',
    title: '全栈工程师',
    group: 'OCTOPUS－总设计',
    tags: [
      {
        key: '0',
        label: '想不平凡',
      },
      {
        key: '1',
        label: '专注Coding',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '余杭区',
    phone: '0752-268888888',
  });
}

// 获取用户列表
function getUsers(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as UserListParams;

  let dataSource = userListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.email) {
    dataSource = dataSource.filter((data) => {
      const { email } = data;
      if (email) {
        return email.includes(params.email || '');
      } else {
        return false;
      }
    });
  }

  if (params.userName) {
    dataSource = dataSource.filter((data) => {
      const { userName } = data;
      if (userName) {
        return userName.includes(params.userName || '');
      } else {
        return false;
      }
    });
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
    data: dataSource,
    total: dataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

// 用户登录操作
function loginAccount(req: Request, res: Response) {
  const { password, userName, type } = req.body;

  let dataSource = userListDataSource.filter((data) => {
    return (userName === data.userName && password === data.password);
  });
  if (dataSource && dataSource.length > 0) {
    res.send({
      status: 'ok',
      type,
      currentAuthority: 'admin',
    });
    return;
  }

  res.send({
    status: 'error',
    type,
    currentAuthority: 'guest',
  });
}

// 用户注册
function userReg(req: Request, res: Response) {
  res.send({ status: 'ok', currentAuthority: 'user' });
}

// 用户新增、修改、删除操作
function optUser(req: Request, res: Response, u: string, b: Request) {
  const { method } = req;
  const body = (b && b.body) || req.body;
  const { id, userName, nickname, email, phone } = body;
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'DELETE':
      userListDataSource = userListDataSource.filter((item) => item.id !== id);
      break;
    case 'PUT':
      userListDataSource = userListDataSource.map((item) => {
        if (item.id === id) {
          return { ...item, ...body };
        }
        return item;
      });
      break;
    case 'POST':
      const i = Math.ceil(Math.random() * 10000);
      userListDataSource.unshift({
        id: `${((i + 1) * 100)}`,
        nickname,
        userName,
        email,
        phone,
        roles: [],
      });
      break;
  }

  const result = {
    list: userListDataSource,
    pagination: {
      total: userListDataSource.length,
    },
  };

  return res.json(result);
}

// 请求异常
function req404(req: Request, res: Response) {
  res.status(404).send({
    timestamp: 1513932643431,
    status: 404,
    error: 'Not Found',
    message: 'No message available',
    path: '/base/category/list/2121212',
  });
}
function req403(req: Request, res: Response) {
  res.status(403).send({
    timestamp: 1513932555104,
    status: 403,
    error: 'Unauthorized',
    message: 'Unauthorized',
    path: '/base/category/list',
  });
}
function req401(req: Request, res: Response) {
  res.status(401).send({
    timestamp: 1513932555104,
    status: 401,
    error: 'Unauthorized',
    message: 'Unauthorized',
    path: '/base/category/list',
  });
}
function req500(req: Request, res: Response) {
  res.status(500).send({
    timestamp: 1513932555104,
    status: 500,
    error: 'error',
    message: 'error',
    path: '/base/category/list',
  });
}

// 代码中会兼容本地 service mock 以及部署站点的静态数据
// 支持值为 Object 和 Array
// GET POST 可省略
export default {
  'GET    /permission/user': getUsers,    // 查询
  'POST   /permission/user': optUser,     // 添加
  'DELETE /permission/user': optUser,     // 删除
  'PUT    /permission/user': optUser,     // 修改
  'GET    /permission/user/current': getCurrentUser,
  'GET    /api/users': getUsers,
  'POST   /api/login/account': loginAccount,
  'POST   /api/register': userReg,
  'GET    /api/500': req500,
  'GET    /api/404': req404,
  'GET    /api/403': req403,
  'GET    /api/401': req401,
  'GET    /api/login/captcha': getFakeCaptcha,
};
