import React, { Component } from 'react';
import { connect, Dispatch, FormattedMessage, formatMessage } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Input, Radio, InputNumber, Button, BackTop } from 'antd';
import InfoItem from '@/components/InfoItem';
import { SaveOutlined, ClearOutlined } from '@ant-design/icons';

interface EmailProps { }

interface EmailState { }

class Email extends Component<EmailProps, EmailState> {
  render() {
    return (
      <PageHeaderWrapper>
        <BackTop />
        <Card bordered={false}>
          <InfoItem
            title={"SMTP HOST"}
            description={"The address of the SMTP server that handles your emails."}>
            <Input
              style={{ width: 320 }}
              size="large"
              placeholder="smtp.yourservice.com" />
          </InfoItem>
          <InfoItem
            title={"SMTP PORT"}
            description={"The port your SMTP server uses for outgoing emails."}>
            <InputNumber
              min={1} max={90000}
              style={{ width: 320 }}
              size="large"
              placeholder="758" />
          </InfoItem>
          <InfoItem
            title={"SMTP SECURITY"}>
            <Radio.Group defaultValue={"none"} size="large">
              <Radio value={"none"}>None</Radio>
              <Radio value={"ssl"}>SSL</Radio>
              <Radio value={"tls"}>TLS</Radio>
              <Radio value={"starttls"}>STARTTLS</Radio>
            </Radio.Group>
          </InfoItem>
          <InfoItem
            title={"SMTP USERNAME"}>
            <Input
              style={{ width: 320 }}
              size="large"
              placeholder="you name" />
          </InfoItem>
          <InfoItem
            title={"SMTP PASSWORD"}>
            <Input
              style={{ width: 320 }}
              size="large"
              placeholder="abc..." />
          </InfoItem>
          <InfoItem
            title={"FROM ADDRESS"}
            description={"Email address you want to use as the sender of OCTOPUS"}>
            <Input
              style={{ width: 320 }}
              size="large"
              placeholder="metabase@yourcompany.com" />
          </InfoItem>
          <Button style={{marginRight: '15px'}} type="primary" shape="round" icon={<SaveOutlined />}>Save changes</Button>
          <Button type="dashed" shape="round" icon={<ClearOutlined />}>Clear</Button>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(

)(Email);
