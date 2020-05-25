import React, { Component } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Button, Dropdown, Menu, message, Modal, Drawer, Checkbox } from 'antd';
import { connect } from "dva";
import { ConnectState } from '@/models/connect';
import { DatasourceModelState, DatasourceListItem } from "@/models/datasource";
import { addDatasource, updateDatasource, removeDatasource, queryDatasource } from '@/services/datasource';
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import { PlusOutlined, EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import OptModal from './components/OptModal';

const { confirm } = Modal;

interface DatasourceProps {
  dispatch: Dispatch<any>;
  role: DatasourceModelState,
}

interface DatasourceState {
  optModalVisible: boolean;
  isEditOpt: boolean;
  currentRecord: DatasourceListItem;
  tableRef: any;
}

class DatasourceView extends Component<DatasourceProps, DatasourceState> {
  public state = {
    optModalVisible: false,
    isEditOpt: false,
    currentRecord: {} as DatasourceListItem,
    tableRef: React.createRef<ActionType | undefined>()
  }

  componentWillMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      // 获取所有数据源类型
      dispatch({
        type: 'datasource/fetchTypeList'
      })
    }
  }
  /**
   * 添加操作
   */
  handleAdd = async (record: DatasourceListItem) => {
    const hide = message.loading('正在添加...');
    try {
      await addDatasource(record);
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error(`添加失败：${error}`);
      return false;
    }
  };

  /**
   * 更新操作
   */
  handleEdit = async (record: DatasourceListItem) => {
    const hide = message.loading('正在修改...');
    try {
      await updateDatasource(record);
      hide();
      message.success('修改成功');
      return true;
    } catch (error) {
      hide();
      message.error(`修改失败：${error}`);
      return false;
    }
  };
  /**
   * 删除操作
   */
  handleRemove = async (id: string) => {
    const hide = message.loading('正在删除...');
    try {
      await removeDatasource(id);
      hide();
      message.success('删除成功');
      return true;
    } catch (error) {
      hide();
      message.error(`删除失败：${error}`);
      return false;
    }
  };

  render() {
    const { tableRef, optModalVisible, currentRecord, isEditOpt } = this.state;

    // 操作菜单列表
    const menus = (record: DatasourceListItem) => (
      <Menu onClick={async (e) => {
        if (e.key === 'resetPwd') {

        } else if (e.key === 'modify') {
          this.setState({
            currentRecord: record,
            isEditOpt: true,
            optModalVisible: true
          });
        } else if (e.key === 'delete') {
          const that = this;
          confirm({
            title: `确定删除数据源：${record.name}`,
            content: `点击【确定按钮】，删除数据源${record.name}`,
            onOk() {
              that.handleRemove(record.id ? record.id : '');
              if (tableRef.current) {
                tableRef.current.reload();
              }
            },
            onCancel() { },
          });
        }
      }}>
        <Menu.Item key="resetPwd" icon={<EditOutlined />}>
          更改状态
        </Menu.Item>
        <Menu.Item key="modify" icon={<EditOutlined />}>
          修改
        </Menu.Item>
        <Menu.Item key="delete" icon={<DeleteOutlined />}>
          删除
        </Menu.Item>
      </Menu>
    );

    const columns: ProColumns<DatasourceListItem>[] = [
      {
        title: '数据源名称',
        dataIndex: 'name',
      },
      {
        title: '源地址',
        dataIndex: 'jdbcUrl',
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueEnum: {
          0: { text: '可用', status: 'Success' },
          1: { text: '不可用', status: 'Error' },
        }
      },
      {
        title: '同步',
        dataIndex: 'sync',
        valueEnum: {
          0: { text: '关闭', status: 'Default' },
          1: { text: '开启', status: 'Success' },
        }
      },
      {
        title: '同步周期',
        dataIndex: 'cron',
        valueType: 'option',
      },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => (
          <>
            <Dropdown overlay={menus(record)}>
              <a>...</a>
            </Dropdown>
          </>
        )
      }
    ]

    return (
      <PageHeaderWrapper>
        <ProTable<DatasourceListItem>
          rowKey="id"
          actionRef={this.state.tableRef}
          toolBarRender={() => [
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                this.setState({
                  optModalVisible: true,
                  isEditOpt: false,
                })
              }}
            >
              新建
              </Button>
          ]}
          tableAlertRender={false}
          rowClassName={(_, index) => index % 2 === 0 ? "table-row-odd" : "table-row-even"}
          request={(params) => queryDatasource(params)}
          columns={columns}
          rowSelection={false}
        />
        {/* 修改数据源信息 */}
        <OptModal
          visible={optModalVisible}
          isEdit={isEditOpt}
          current={currentRecord}
          onSubmit={async (value) => {
            const success = await isEditOpt ?
              this.handleEdit(value) : this.handleAdd(value);
            if (success) {
              this.setState({
                optModalVisible: false,
                isEditOpt: false,
              });
              if (tableRef.current) {
                tableRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            this.setState({
              optModalVisible: false,
              isEditOpt: false,
            });
          }}
        />
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ datasource, loading }: ConnectState) => ({
  datasource,
  loading: loading.models.datasource,
}))(DatasourceView);