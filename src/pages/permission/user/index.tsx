import React, { Component } from 'react';
import { connect, Dispatch } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Dropdown, Menu, message, Modal, Drawer, Checkbox } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { UserListItem } from '@/models/user';
import OptModal from './components/OptModal';
import { ConnectState } from '@/models/connect';
import { PlusOutlined, EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import { queryUsers, updateUser, addUser, removeUser } from '@/services/user';
import { RoleModelState } from '@/models/role';
import { CheckboxOptionType } from 'antd/lib/checkbox';

const { confirm } = Modal;
const CheckboxGroup = Checkbox.Group;

interface UserListProps {
  dispatch: Dispatch<any>;
  role: RoleModelState,
}

interface UserListState {
  roleOptVisible: boolean;
  optModalVisible: boolean;
  isEditOpt: boolean;
  currentRecord: UserListItem;
  tableRef: any;
}

class UserListView extends Component<UserListProps, UserListState> {
  public state = {
    roleOptVisible: false,
    optModalVisible: false,
    isEditOpt: false,
    currentRecord: {} as UserListItem,
    tableRef: React.createRef<ActionType | undefined>()
  }

  componentWillMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      // 获取所有角色列表
      dispatch({
        type: 'role/fetchAll'
      })
    }
  }

  /**
   * 添加操作
   */
  handleAdd = async (record: UserListItem) => {
    const hide = message.loading('正在添加...');
    try {
      await addUser(record);
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
  handleEdit = async (record: UserListItem) => {
    const hide = message.loading('正在修改...');
    try {
      await updateUser(record);
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
      await removeUser(id);
      hide();
      message.success('删除成功');
      return true;
    } catch (error) {
      hide();
      message.error(`删除失败：${error}`);
      return false;
    }
  };

  // 角色操作渲染
  getRoleOptRender = (roles: string[] | undefined) => {
    if (roles && roles.length > 0) {
      return (<span>{roles.length}个角色</span>);
    } else {
      return (<span>无角色</span>);
    }
  };

  render() {
    const { tableRef, roleOptVisible, optModalVisible, currentRecord, isEditOpt } = this.state;

    // 操作菜单列表
    const menus = (record: UserListItem) => (
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
            title: `确定删除角色：${record.userName}`,
            content: `点击【确定按钮】，删除角色${record.userName}`,
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
          重置密码
        </Menu.Item>
        <Menu.Item key="modify" icon={<EditOutlined />}>
          修改
        </Menu.Item>
        <Menu.Item key="delete" icon={<DeleteOutlined />}>
          删除
        </Menu.Item>
      </Menu>
    );

    const columns: ProColumns<UserListItem>[] = [
      {
        title: '名称',
        dataIndex: 'nickname',
      },
      {
        title: '登录名',
        dataIndex: 'userName',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '拥有角色',
        dataIndex: 'roles',
        valueType: 'option',
        render: (_, record) => {
          const { roles } = record;
          return (
            <a onClick={() => {
              this.setState({
                roleOptVisible: true,
                currentRecord: record,
              });
            }}>
              {this.getRoleOptRender(roles)}
            </a>
          );
        }
      },
      {
        title: '最近登录',
        dataIndex: 'lastLogin',
        valueType: 'option',
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

    // 渲染快捷查看角色列表
    const renderDrawerRole = () => {
      const { role: { list: roleList } } = this.props;
      const { currentRecord: { roles } } = this.state;
      const plainOptions: CheckboxOptionType[] = roleList.map(r => r.name);
      const size = roles ? roles.length : 0;
      return (
        <div>
          <span>已选择 <strong>{size}</strong> 条/总共 {roleList.length} 条</span>
          <CheckboxGroup
            options={plainOptions}
          // value={roles}
          />
        </div>
      );
    };

    return (
      <PageHeaderWrapper>
        <ProTable<UserListItem>
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
          request={(params) => queryUsers(params)}
          columns={columns}
          rowSelection={false}
        />
        {/* 修改用户信息 */}
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
        {/* 用户角色设置 */}
        <Drawer
          destroyOnClose
          title="用户角色管理"
          placement={"right"}
          closable={true}
          visible={roleOptVisible}
          onClose={(e) => {
            this.setState({
              roleOptVisible: false
            });
            if (tableRef.current) {
              tableRef.current.reload();
            }
          }}
        >
          {renderDrawerRole()}
        </Drawer>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ user, role, loading }: ConnectState) => ({
  role,
  user,
  loading: loading.models.user && loading.models.role,
}))(UserListView);
