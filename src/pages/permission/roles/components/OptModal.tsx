import React from 'react';
import { Form, Input, Tooltip } from 'antd';
import FormModal from '@/components/FormModal';
import { RoleListItem } from '../data';

const FormItem = Form.Item;

export interface FormValueType extends Partial<RoleListItem> {
  // 主键id
  id?: string;
  // 分组名
  name?: string;
  // 角色编码
  code?: string;
  // 角色类型
  type?: number;
  // 角色描述
  comment?: string;
}

interface OptModalProps {
  isEdit: boolean;
  visible: boolean;
  current: Partial<FormValueType> | undefined;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
}

const OptModal: React.FC<OptModalProps> = (props) => {
  const { isEdit, visible, current, onCancel, onSubmit } = props;

  return (
    <FormModal
      title={`${isEdit ? '修改' : '新增'}角色`}
      visible={visible}
      current={current}
      onCancel={onCancel}
      onSubmit={onSubmit}
    >
      <FormItem
        name="name"
        label="角色名称"
        rules={[{ required: true }]}
      >
        <Input placeholder="名称必须唯一" style={{ width: 220 }} />
      </FormItem>
      <FormItem label="角色编码">
        <FormItem name="code" noStyle>
          <Input placeholder="请输入角色编码" style={{ width: 220 }} />
        </FormItem>
        <Tooltip title="随机生成一个角色编码">
          <a style={{ margin: '0 10px' }}>随机</a>
        </Tooltip>
      </FormItem>
      <FormItem
        name="comment"
        label="描述信息"
        rules={[{ message: '请输入至少五个字符的产品描述！', min: 5 }]}
      >
        <Input.TextArea rows={4} placeholder="请输入至少五个字符" />
      </FormItem>
    </FormModal>
  );
}

export default OptModal;