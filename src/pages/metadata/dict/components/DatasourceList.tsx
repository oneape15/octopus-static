import React, { Component } from 'react';
import { Select, Tooltip } from 'antd';

const { Option } = Select;

export interface KeyValueItem {
  key: string;
  value: string;
}

export interface DatasourceListViewProps {
  defaultValue: string;
  list: KeyValueItem[];
  onChange: (value: string) => void;
  onSync: (value: string) => void;
}

class DatasourceListView extends Component<DatasourceListViewProps, any> {

  render() {
    const { defaultValue, list, onSync, onChange } = this.props;
    const options = list.map(l => <Option key={l.key} value={l.key}>{l.value}</Option>)
    return (
      <div>
        <span>当前数据源：</span>
        <Select
          defaultValue={defaultValue}
          style={{ width: 220, marginRight: 5 }}
          onChange={(value) => { onChange(value) }}
          placeholder="请选择数据源"
        >
          {options}
        </Select>
        <Tooltip placement="top" title="同步表信息">
          <a onClick={() => { onSync(defaultValue) }}>同步</a>
        </Tooltip>
      </div>
    );
  }
}

export default DatasourceListView;