import React, { Component } from 'react';
import { connect, Dispatch, FormattedMessage, formatMessage } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Switch, BackTop } from 'antd';
import InfoItem from '@/components/InfoItem';

interface CachingProps { }

interface CachingState { }

class Caching extends Component<CachingProps, CachingState> {
  render() {
    return (
      <PageHeaderWrapper>
        <BackTop />
        <Card bordered={false}>
        <InfoItem
              title={"ENABLE CACHING"}
              description={"Enabling caching will save the results of queries that take a long time to run."}
            >
              <Switch />
            </InfoItem>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(

)(Caching);
