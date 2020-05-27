import React, { Component } from 'react';
import { List, Tooltip, Input } from 'antd';
import {TableInfoItem} from '@/models/datasource';

export interface TableListViewProps {
  defaultValue: string;
  list: TableInfoItem[];
  // onChange: (value: string) => void;
  // onSync: (value: string) => void;
}

class TableListView extends Component<TableListViewProps, any> {

  render() {
    const { defaultValue, list, onSync, onChange } = this.props;
    return (
      <div>
        <Input placeholder="输入表名或别名" />
        <List
          dataSource={list}
          renderItem={item=> (
            <List.Item>
              {item.name}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default TableListView;