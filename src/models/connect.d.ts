import { DatasourceModelState } from './datasource';
import { MenuDataItem } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import { RoleModelState } from './role';
import { StateType } from './login';

export { GlobalModelState, SettingModelState, UserModelState, RoleModelState, };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
    role?: boolean;
    datasource?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  role: RoleModelState;
  datasource: DatasourceModelState;
  login: StateType;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
