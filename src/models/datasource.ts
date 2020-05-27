import { Effect, Reducer } from 'umi';
import { queryAll, queryDatasourceTypeList, getDatasourceTableList } from '@/services/datasource';

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

export interface TableInfoItem {
  name: string;
  alias?: string;
}

export interface DatasourceModelState {
  all: DatasourceListItem[];
  datasourceTypeList: DatasourceTypeItem[];
  tableList: TableInfoItem[];
}

export interface DatasourceModelType {
  namespace: string;
  state: DatasourceModelState;
  effects: {
    fetchAll: Effect;
    fetchTypeList: Effect;
    fetchTableList: Effect;
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
    tableList:[],
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
    },
    *fetchTableList({payload, callback}, {call, put}) {
      const resp = yield call(getDatasourceTableList, payload);
      if (resp && callback) {
        callback(resp);
      }
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