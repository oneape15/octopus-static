import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import { connect, Dispatch } from 'umi';
import FormModal from '@/components/FormModal';
import { UserListItem } from '@/models/user';
import { ConnectState } from '@/models/connect';
import { RoleModelState } from '@/models/role';


const FormItem = Form.Item;
const { Option } = Select;

export interface FormValueType extends Partial<UserListItem> {
  // 主键id
  id?: string;
  // 用户昵称
  nickname?: string;
  // 用户名称
  userName?: string;
  // email
  email?: string;
  // 电话号码
  phone?: string;
}

export interface OptModalState { }

export interface OptModalProps {
  dispatch: Dispatch<any>;
  role: RoleModelState,
  isEdit: boolean;
  visible: boolean;
  current: Partial<FormValueType> | undefined;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
}

class OptModal extends Component<OptModalProps, OptModalState> {

  render() {
    const { isEdit, visible, current, onCancel, onSubmit, role } = this.props;
    const { list: roleList } = role;
    const options = roleList.map(r => <Option key={r.id} value={r.id ? r.id : ''}>{r.name}</Option>)
    return (
      <FormModal
        title={`${isEdit ? '修改' : '新增'}人员`}
        visible={visible}
        current={current}
        onCancel={onCancel}
        onSubmit={onSubmit}
      >
        <FormItem
          name="userName"
          label="用户名称"
          rules={[{ required: true }]}
        >
          <Input placeholder="zhangsan" />
        </FormItem>
        <FormItem
          name="nickname"
          label="用户姓名"
          rules={[{ required: false }]}
        >
          <Input placeholder="张三" />
        </FormItem>
        <FormItem
          name="email"
          label="邮箱地址"
          rules={[{ required: true }]}
        >
          <Input placeholder="zhangsan@email.com" />
        </FormItem>
        <FormItem
          name="phone"
          label="手机号"
        >
          <Input placeholder="15712345678" />
        </FormItem>
        <FormItem
          name="roles"
          label="角色"
        >
          <Select mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择相应角色"
            optionFilterProp="label"
          >
            {options}
          </Select>
        </FormItem>
      </FormModal>
    );
  }
}

export default connect(({ role, loading }: ConnectState) => ({
  role,
  loading: loading.models.role,
}))(OptModal);