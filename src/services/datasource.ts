import request from '@/utils/request';

const dsUri = '/metadata/datasource';

export interface DatasourceListParams {
  id?: string;
  name?: string;
  type?: string;
  status?: number;
  jdbcUrl?: string;
  jdbcDriver?: string;
  username?: string;
  password?: string;
  sync?: number;
  cron?: string;
  timeout?: number;
  testSql?: string;
  comment?: string;
  sorter?: string;
  pageSize?: number;
  currentPage?: number;
}

/**
 * 获取所有数据源
 */
export async function queryAll() {
  return request(`${dsUri}/allDatasource`)
}

export async function queryDatasourceTypeList() {
  return request(`${dsUri}/dsTypeList`)
}
/**
 * 查询数据源列表
 * @param params 
 */
export async function queryDatasource(params?: DatasourceListParams): Promise<any> {
  return request(dsUri, {
    method: 'GET',
    data: {
      ...params,
    }
  });
}
/**
 * 添加数据源
 * @param params 
 */
export async function addDatasource(params?: DatasourceListParams) {
  return request(dsUri, {
    method: 'POST',
    data: {
      ...params
    }
  })
}

/**
 * 更新数据源
 * @param params 
 */
export async function updateDatasource(params?: DatasourceListParams) {
  return request(dsUri, {
    method: 'PUT',
    data: {
      ...params,
    }
  })
}

/**
 * 删除数据源
 * @param params 
 */
export async function removeDatasource(id: string) {
  return request(dsUri, {
    method: 'DELETE',
    data: {
      id,
    }
  })
}
