import React, { Component } from 'react';
import { connect, Dispatch, FormattedMessage, formatMessage } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Input } from 'antd';
import InfoItem from '@/components/InfoItem';

interface FormattingProps { }

interface FormattingState { }

class Formatting extends Component<FormattingProps, FormattingState> {
  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <InfoItem
            title={"Date style"}>
            <Input />
          </InfoItem>
          <InfoItem
            title={"Date separators"}>
            <Input />
          </InfoItem>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(

)(Formatting);
