import request from '@/utils/request';

const userUri = '/permission/user';

export interface UserListParams {
  id?: string;
  userName?: string;
  phone?: string;
  email?: string;
  sorter?: string;
  pageSize?: number;
  currentPage?: number;
}
/**
 * 查询用户列表
 * @param params 
 */
export async function queryUsers(params?: UserListParams): Promise<any> {
  return request(userUri);
}
/**
 * 添加用户
 * @param params 
 */
export async function addUser(params?: UserListParams) {
  return request(userUri, {
    method: 'POST',
    data: {
      ...params
    }
  })
}

/**
 * 更新用户
 * @param params 
 */
export async function updateUser(params?: UserListParams) {
  return request(userUri, {
    method: 'PUT',
    data: {
      ...params,
    }
  })
}

/**
 * 删除用户
 * @param params 
 */
export async function removeUser(id: string) {
  return request(userUri, {
    method: 'DELETE',
    data: {
      id,
    }
  })
}

export async function queryCurrent(): Promise<any> {
  return request(`${userUri}/current`);
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
