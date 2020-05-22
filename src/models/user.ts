import { Effect, Reducer } from 'umi';

import { queryCurrent, queryUsers } from '@/services/user';

export interface UserListItem {
  // 主键id
  id?: string;
  // 用户昵称
  nickname?: string;
  // 用户名登录名
  userName?: string;
  // 密码
  password?: string;
  // 手机号
  phone?: string;
  // 邮箱地址
  email?: string;
  // 角色列表
  roles?: string[];
  // 头像
  avatar?: string;
  // 最后登录时间
  lastLogin?: string;
}

export interface CurrentUser {
  id?: string;
  nickname?: string;
  userName?: string;
  title?: string;
  group?: string;
  avatar?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  unreadCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
