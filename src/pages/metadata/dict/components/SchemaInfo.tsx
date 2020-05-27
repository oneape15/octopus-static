import React, { Component } from 'react';
import { Select, Tooltip, Table } from 'antd';

const { Option } = Select;

export interface KeyValueItem {
  key: string;
  value: string;
}

export interface SchemaInfoViewProps {
  // defaultValue: string;
  // list: KeyValueItem[];
  // onChange: (value: string) => void;
  // onSync: (value: string) => void;
}

class SchemaInfoView extends Component<SchemaInfoViewProps, any> {

  render() {
    const columns = [
      {
        title: '字段名',
        dataIndex: 'name',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
      },
      {
        title: '别名',
        dataIndex: 'alias',
      },
      {
        title: '描述',
        dataIndex: 'comment'
      }
    ]
    return (
      <div>
        <Table columns={columns} />
      </div>
    );
  }
}

export default SchemaInfoView;