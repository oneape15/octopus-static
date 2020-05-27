import React, { Component } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Button, Dropdown, Menu, message, Modal, Drawer, Checkbox, Card } from 'antd';
import { connect } from "dva";
import { ConnectState } from '@/models/connect';
import { DatasourceModelState, DatasourceListItem } from "@/models/datasource";
import { fetchDatasourceTableList } from '@/services/datasource';

import DatasourceListView, { KeyValueItem } from './components/DatasourceList';
import TableListView from './components/TableList';
import SchemaInfoView from './components/SchemaInfo';

interface DatasourceProps {
  dispatch: Dispatch<any>;
  datasource: DatasourceModelState,
}

interface DatasourceState {
  optModalVisible: boolean;
  isEditOpt: boolean;
  currentDsId: string;
}

class DatasourceView extends Component<DatasourceProps, DatasourceState> {
  public state = {
    optModalVisible: false,
    isEditOpt: false,
    currentDsId: '',
  }

  componentWillMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      // 获取所有数据源类型
      dispatch({
        type: 'datasource/fetchAll'
      })
    }
  }

  /**
   * 删除操作
   */
  handleLoadTableList = (id: string) => {
    const hide = message.loading('正在加载数据源表信息...');
    const { dispatch } = this.props;
    if (dispatch) {
      // 获取所有数据源类型
      dispatch({
        type: 'datasource/fetchTableList'
      })
    }
  };

  render() {
    const { currentDsId, } = this.state;
    const { datasource: { all } } = this.props;
    let allDsList: KeyValueItem[] = [];
    if (all && all.length > 0) {
      all.map(ds => {
        allDsList.push({
          key: ds.id || '',
          value: ds.name || ''
        })
      });
    }
    return (
      <Card>
        <DatasourceListView
          list={allDsList}
          defaultValue={currentDsId}
          onChange={(val) => {
            this.setState({
              currentDsId: val,
            });
            console.log('---> change')
            this.handleLoadTableList(val);
          }}
          onSync={(val) => { console.log('--->sync', val) }}
        />
        <div style={{ margin: '10px 0' }}>
          <div style={{ display: 'inline-block', width: '300px', height: '700px', border: '1px solid' }}>
            <TableListView />
          </div>
          <div style={{ display: 'inline-block', width: 'calc(100% - 350px)' }}>
            <SchemaInfoView />
          </div>
        </div>
      </Card>
    );
  }
}

export default connect(({ datasource, loading }: ConnectState) => ({
  datasource,
  loading: loading.models.datasource,
}))(DatasourceView);