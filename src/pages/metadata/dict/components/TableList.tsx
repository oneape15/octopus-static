import React, { Component } from 'react';
import { List, Tooltip, Input } from 'antd';

export interface KeyValueItem {
  key: string;
  value: string;
}

export interface TableListViewProps {
  // defaultValue: string;
  // list: KeyValueItem[];
  // onChange: (value: string) => void;
  // onSync: (value: string) => void;
}

class TableListView extends Component<TableListViewProps, any> {

  render() {
    const { defaultValue, list, onSync, onChange } = this.props;
    return (
      <div>
        <Input placeholder="输入表名或别名" />
        <List></List>
      </div>
    );
  }
}

export default TableListView;