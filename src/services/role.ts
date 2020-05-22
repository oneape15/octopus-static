import request from 'umi-request';

const roleUri = '/permission/role';

export interface RoleListParams {
  id?: string;
  name?: string;
  code?: string;
  type?: number;
  comment?: string;
  sorter?: string;
  pageSize?: number;
  currentPage?: number;
}

export async function queryAll() {
  console.log('---get all roles')
  return request(`${roleUri}/allRoles`, {
    method: 'GET'
  });
}
/**
 * 查询角色列表
 * @param params 
 */
export async function queryRole(params?: RoleListParams) {
  return request(roleUri, {
    method: 'GET',
    params,
  });
}

/**
 * 添加角色
 * @param params 
 */
export async function addRole(params?: RoleListParams) {
  return request(roleUri, {
    method: 'POST',
    data: {
      ...params,
      method: 'post'
    }
  })
}

/**
 * 更新角色
 * @param params 
 */
export async function updateRole(params?: RoleListParams) {
  return request(roleUri, {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    }
  })
}

/**
 * 删除角色
 * @param params 
 */
export async function removeRole( id: string ) {
  return request(roleUri, {
    method: 'DELETE',
    data: {
      id,
      method: 'delete',
    }
  })
}