import { Effect, Reducer } from 'umi';
import { queryRole, queryAll } from '@/services/role';

export interface RoleListItem {
  // 主键id
  id?: string;
  // 分组名
  name?: string;
  // 角色编码
  code?: string;
  // 角色类型
  type?: number;
  // 成员数量
  members?: number;
  // 角色描述
  comment?: string;
}

export interface RoleModelState {
  list: RoleListItem[];
}

export interface RoleModelType {
  namespace: string;
  state: RoleModelState;
  effects: {
    fetch: Effect;
    fetchAll: Effect;
  };
  reducers: {
    saveList: Reducer<RoleModelState>;
  };
}

const Model: RoleModelType = {
  namespace: 'role',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(queryRole, payload);
      yield put({
        type: 'saveList',
        payload: Array.isArray(resp) ? resp : [],
      });
    },
    *fetchAll({ _ }, { call, put }) {
      const resp = yield call(queryAll);
      yield put({
        type: 'saveList',
        payload: Array.isArray(resp) ? resp : [],
      });
    }
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },

};

export default Model;

