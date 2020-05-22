import React, { Component } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Tooltip, Dropdown, Menu, message, Modal } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { RoleListItem } from '@/models/role';
import OptModal from './components/OptModal';
import { PlusOutlined, EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import { queryRole, updateRole, addRole, removeRole } from '../../../services/role';

const { confirm } = Modal;

interface RoleListProps { }

interface RoleListState {
  optModalVisible: boolean;
  isEditOpt: boolean;
  currentRecord: RoleListItem;
  tableRef: any;
}

class RoleList extends Component<RoleListProps, RoleListState> {
  public state = {
    optModalVisible: false,
    isEditOpt: false,
    currentRecord: {},
    tableRef: React.createRef<ActionType | undefined>()
  }

  /**
   * 添加操作
   */
  handleAdd = async (record: RoleListItem) => {
    const hide = message.loading('正在添加...');
    try {
      await addRole(record);
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
  handleEdit = async (record: RoleListItem) => {
    const hide = message.loading('正在修改...');
    try {
      await updateRole(record);
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
      await removeRole(id);
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
    const menus = (record: RoleListItem) => (
      <Menu onClick={async (e) => {
        if (e.key === 'modify') {
          this.setState({
            currentRecord: record,
            isEditOpt: true,
            optModalVisible: true,
          });
        } else if (e.key === 'delete') {
          const that = this;
          confirm({
            title: `确定删除角色：${record.name}`,
            content: `点击【确定按钮】，删除角色${record.name}`,
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
        <Menu.Item key="modify" icon={<EditOutlined />}>
          修改
        </Menu.Item>
        <Menu.Item key="delete" icon={<DeleteOutlined />}>
          删除
        </Menu.Item>
      </Menu>
    );

    // 字段信息
    const columns: ProColumns<RoleListItem>[] = [
      {
        title: '角色名称',
        dataIndex: 'name',
        render: (text, record) => (
          <>
            <Tooltip title="查看人员信息">
              <a onClick={() => {
                console.log(record)
              }}>
                {text}
              </a>
            </Tooltip>
          </>
        ),
      },
      {
        title: '角色编码',
        dataIndex: 'code'
      },
      {
        title: '角色类型',
        dataIndex: 'type',
        valueEnum: {
          0: { text: '普通', status: 'Default' },
          1: { text: '默认', status: 'Success' },
        }
      },
      {
        title: '成员数量',
        dataIndex: 'members',
        valueType: 'option',
        renderText: (val: string) => `${val} 人`
      },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => (
          <Dropdown overlay={menus(record)}>
            <a>...</a>
          </Dropdown>
        ),
      }
    ];
    return (
      <PageHeaderWrapper>
        <ProTable<RoleListItem>
          rowKey="id"
          actionRef={this.state.tableRef}
          toolBarRender={(action, { selectedRows }) => [
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
            </Button>,
          ]}
          tableAlertRender={false}
          rowClassName={(_, index) => index % 2 === 0 ? "table-row-odd" : "table-row-even"}
          request={(params) => queryRole(params)}
          columns={columns}
          rowSelection={false}
        />
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

export default connect(

)(RoleList);
