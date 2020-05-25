import { Effect, Reducer } from 'umi';
import { queryAll, queryDatasourceTypeList } from '@/services/datasource';

export interface DatasourceListItem {
  // 主键id
  id?: string;
  // 数据源名称唯一
  name?: string;
  // 数据源类型 MySQL Oracle
  type?: string;
  // 状态 0 - 可用； 1 - 不可用
  status?: number;
  // 数据源地址
  jdbcUrl?: string;
  // jdbc驱动
  jdbcDriver?: string;
  // 数据源名称
  username?: string;
  // 数据源密码
  password?: string;
  // 同步状态 0 - 不同步; 1 - 同步
  sync?: number;
  // 同步周期表达式 '0 0 9 * * ?'
  cron?: string;
  // 连接池超时时间(ms)
  timeout?: number;
  // 检测SQL
  testSql?: string;
  // 描述
  comment?: string;
}

/**
 * 数据源类型
 */
export interface DatasourceTypeItem {
  type?: string;
  jdbcUrl?: string;
}

export interface DatasourceModelState {
  all: DatasourceListItem[];
  datasourceTypeList: DatasourceTypeItem[];
}

export interface DatasourceModelType {
  namespace: string;
  state: DatasourceModelState;
  effects: {
    fetchAll: Effect;
    fetchTypeList: Effect;
  };
  reducers: {
    saveAll: Reducer<DatasourceModelState>;
    saveDatasourceTypeList: Reducer<DatasourceModelState>;
  }
}

const Model: DatasourceModelType = {
  namespace: 'datasource',

  state: {
    all: [],
    datasourceTypeList: [],
  },

  effects: {
    *fetchAll({ _ }, { call, put }) {
      const resp = yield call(queryAll);
      yield put({
        type: 'saveAll',
        payload: Array.isArray(resp) ? resp : [],
      });
    },
    *fetchTypeList({ _ }, { call, put }) {
      const resp = yield call(queryDatasourceTypeList);
      yield put({
        type: 'saveDatasourceTypeList',
        payload: Array.isArray(resp) ? resp : [],
      });
    }
  },

  reducers: {
    saveAll(state, action) {
      return {
        ...state,
        all: action.payload,
      }
    },
    saveDatasourceTypeList(state, action) {
      return {
        ...state,
        datasourceTypeList: action.payload,
      }
    },
  }
}

export default Model;