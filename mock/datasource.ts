import { Request, Response } from 'express';
import { parse } from 'url';

import { DatasourceListItem } from '@/models/datasource';
import { DatasourceListParams } from '@/services/datasource';

let dsList: DatasourceListItem[] = [];

for (let i = 0; i < 30; i += 1) {
  let mod = i % 3;
  dsList.push({
    id: `${((i + 1) * 100)}`,
    status: i % 2,
    name: `ds_${i}`,
    type: `${mod === 0 ? 'ODPS' : mod === 1 ? 'MySQL' : mod === 2 ? 'PosgreSQL' : 'Oracle'}`,
    username: `user_${i}`,
    password: `pwd00${i}`,
    sync: i % 2,
    cron: `0 0 0/${i % 12} * * ?`,
    jdbcUrl: 'jdbc://127.0.0.1:8080/dem',
    jdbcDriver: 'com.mysql.Driver',
  })
}

function getDatasources(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as DatasourceListParams;

  let dataSource = dsList;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }
  // 名字筛选
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
  // url筛选
  if (params.jdbcUrl) {
    dataSource = dataSource.filter((data) => {
      const { jdbcUrl } = data;
      if (jdbcUrl) {
        return jdbcUrl.includes(params.jdbcUrl || '');
      } else {
        return false;
      }
    });
  }
  // 状态筛选
  if (params.status) {
    let filterDataSource: DatasourceListItem[] = [];
    filterDataSource = filterDataSource.concat(
      dataSource.filter((item) => {
        if (parseInt(`${item.status}`, 10) === params.status) {
          return true;
        }
        return false;
      }),
    );
    dataSource = filterDataSource;
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

// 获取数据源类型
function getDataTypeList(req: Request, res: Response) {
  res.json([
    {
      type: 'MySQL',
      jdbcUrl: 'jdbc:mysql://{host}:{port}/{dbName}'
    },
    {
      type: 'PostgreSQL',
      jdbcUrl: 'jdbc:postgresql://{host}:{port}/{dbName}',
    },
    {
      type: 'OdpsSQL',
      jdbcUrl: 'jdbc:odps:{host}?project={dbName}'
    },
    {
      type: 'Oracle',
      jdbcUrl: 'jdbc:oracle://{host}:{port}/{dbName}'
    }
  ])
}

// 数据源新增、修改、删除操作
function optDatasource(req: Request, res: Response, u: string, b: Request) {
  const { method } = req;
  const body = (b && b.body) || req.body;
  const { id, name, jdbcUrl, status, sync, cron, username, password, comment, timeout, testSql, } = body;
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'DELETE':
      dsList = dsList.filter((item) => item.id !== id);
      break;
    case 'PUT':
      dsList = dsList.map((item) => {
        if (item.id === id) {
          return { ...item, ...body };
        }
        return item;
      });
      break;
    case 'POST':
      const i = Math.ceil(Math.random() * 10000);
      dsList.unshift({
        id: `${((i + 1) * 100)}`,
        name,
        status,
        username,
        password,
        jdbcUrl,
        sync,
        cron,
        testSql,
        timeout,
        comment,
      });
      break;
  }

  const result = {
    list: dsList,
    pagination: {
      total: dsList.length,
    },
  };

  return res.json(result);
}

function getAllDatasource(req: Request, res: Response) {
  return res.json(dsList);
}

function getTableList(req: Request, res: Response) {
  return res.json([
    {
      name: 'tb_user',
      alias: '用户表'
    },
    {
      name: 'tb_role',
      alias: '角色表'
    }
  ])
}

export default {
  // 查询
  'GET    /metadata/datasource': getDatasources,
  // 添加
  'POST   /metadata/datasource': optDatasource,
  // 删除
  'DELETE /metadata/datasource': optDatasource,
  // 修改
  'PUT    /metadata/datasource': optDatasource,
  // 获取所有数据源
  'GET    /metadata/datasource/allDatasource': getAllDatasource,
  // 获取数据源类型
  'GET    /metadata/datasource/dsTypeList': getDataTypeList,
  // 获取相应数据源的表信息
  'POST /metadata/datasource/getDsTableList': getTableList,
};