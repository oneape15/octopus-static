import React, { Component } from 'react';
import { Form, Input, Select, Switch, InputNumber, Tooltip } from 'antd';
import { connect, Dispatch } from 'umi';
import FormModal from '@/components/FormModal';
import { DatasourceListItem, DatasourceModelState } from '@/models/datasource';
import { ConnectState } from '@/models/connect';
import { DatasourceListParams } from '@/services/datasource';


const FormItem = Form.Item;
const { Option } = Select;

export interface FormValueType extends Partial<DatasourceListItem> {
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
  datasource: DatasourceModelState,
  isEdit: boolean;
  visible: boolean;
  current: Partial<FormValueType> | undefined;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
}

class OptModal extends Component<OptModalProps, OptModalState> {

  render() {
    const { isEdit, visible, current, onCancel, onSubmit, datasource } = this.props;
    const { datasourceTypeList } = datasource;

    const options = datasourceTypeList.map((d, index) => (<Option key={d.type} value={d.type || index} >{d.type}</Option>))
    return (
      <FormModal
        title={`${isEdit ? '修改' : '新增'}数据源`}
        width={600}
        visible={visible}
        current={current}
        onCancel={onCancel}
        onSubmit={onSubmit}
      >
        <FormItem label="源名称" style={{ marginBottom: 0 }}>
          <FormItem
            name="name"
            style={{ display: 'inline-block', width: 'calc(50% - 30px)' }}
            rules={[{ required: true }]}
          >
            <Input placeholder="数据库名称" />
          </FormItem>
          <span style={{ display: 'inline-block', width: '70px', lineHeight: '32px', textAlign: 'center' }}>
            类型：
          </span>
          <FormItem
            name="type"
            style={{ display: 'inline-block', width: 'calc(50% - 40px)' }}
          >
            <Select
              style={{ width: '100%' }}
              placeholder="请选择数据源类型"
              optionFilterProp="label"
            >
              {options}
            </Select>
          </FormItem>
        </FormItem>
        <FormItem
          name="jdbUrl"
          label="源地址"
          rules={[{ required: true }]}
        >
          <Input placeholder="jdbc://xxxx" />
        </FormItem>
        <FormItem label="登录名" style={{ marginBottom: 0 }} rules={[{ required: true }]}>
          <FormItem
            name="username"
            style={{ display: 'inline-block', width: 'calc(50% - 30px)' }}
            rules={[{ required: true }]}
          >
            <Input placeholder="zhangsan@email.com" />
          </FormItem>
          <span style={{ display: 'inline-block', width: '70px', lineHeight: '32px', textAlign: 'center' }}>
            密码：
          </span>
          <FormItem
            name="password"
            style={{ display: 'inline-block', width: 'calc(50% - 40px)' }}
          >
            <Input placeholder="15712345678" />
          </FormItem>
        </FormItem>
        <FormItem
          name="sync"
          label="是否同步"
        >
          <Switch />
        </FormItem>
        <FormItem label="CRON表" style={{ display: 'none' }}>
          <FormItem
            name="cron"
            noStyle
            rules={[{ required: false, message: "CRON表达式不能为空" }]}
          >
            <Input style={{ width: 320 }} placeholder="0 0/2 * * * ?" />
          </FormItem>
          <Tooltip title="检测CRON表达式">
            <a href="#API" style={{ margin: '0 8px' }}>
              检测
          </a>
          </Tooltip>
        </FormItem>

        <FormItem
          name="timeout"
          label="超时时间"
        >
          <InputNumber placeholder="60" />
        </FormItem>
        <FormItem
          name="testSql"
          label="检测SQL"
        >
          <Input placeholder="SELECT 1" />
        </FormItem>
      </FormModal>
    );
  }
}

export default connect(({ datasource, loading }: ConnectState) => ({
  datasource,
  loading: loading.models.datasource,
}))(OptModal);