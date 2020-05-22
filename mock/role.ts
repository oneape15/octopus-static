// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';
import { RoleListItem } from '@/models/role';
import { RoleListParams } from '@/services/role';

// mock roleListDataSource
let roleListDataSource: RoleListItem[] = [];

for (let i = 0; i < 100; i += 1) {
  roleListDataSource.push({
    id: `${((i + 1) * 100)}`,
    type: i % 2,
    name: `角色 ${i}`,
    code: `ROLE_${i}`,
    comment: '这是一段描述',
    members: Math.ceil(Math.random() * 10),
  });
}

// 获取所有角色
function getAllRoles(req: Request, res: Response) {
  return res.json(roleListDataSource);
}

function getRole(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as RoleListParams;

  let dataSource = roleListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.type) {
    let filterDataSource: RoleListItem[] = [];
    filterDataSource = filterDataSource.concat(
      dataSource.filter((item) => {
        if (parseInt(`${item.type}`, 10) === params.type) {
          return true;
        }
        return false;
      }),
    );
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => {
      const { name } = data;
      if (name) {
        return name.includes(params.name || '');
      } else {
        return false;
      }
    });
  }
  if (params.code) {
    dataSource = dataSource.filter((data) => {
      const { code } = data;
      if (code) {
        return code.includes(params.code || '');
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


function optRole(req: Request, res: Response, u: string, b: Request) {
  const body = (b && b.body) || req.body;
  const { id, method, code, comment, name } = body;
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      console.log('delte', id)
      roleListDataSource = roleListDataSource.filter((item) => item.id !== id);
      break;
    case 'put':
      roleListDataSource = roleListDataSource.map((item) => {
        if (item.id === id) {
          return { ...item, ...body };
        }
        return item;
      });
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      roleListDataSource.unshift({
        id: `${((i + 1) * 100)}`,
        type: i % 2,
        name,
        code,
        comment,
        members: Math.ceil(Math.random() * 10),
      });
      break;
  }

  const result = {
    list: roleListDataSource,
    pagination: {
      total: roleListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  // 查询
  'GET    /permission/role': getRole,
  // 添加
  'POST   /permission/role': optRole,
  // 删除
  'DELETE /permission/role': optRole,
  // 修改
  'PUT    /permission/role': optRole,
  // 获取所有角色
  'GET    /permission/role/allRoles': getAllRoles,
};