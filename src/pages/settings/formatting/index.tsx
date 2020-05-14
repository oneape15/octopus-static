import React, { Component } from 'react';
import { connect, Dispatch, FormattedMessage, formatMessage } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Radio, Select, Switch, BackTop } from 'antd';
import InfoItem from '@/components/InfoItem';
import InfoSection from '@/components/InfoSection';

const { Option } = Select;

interface FormattingProps { }

interface FormattingState { }

class Formatting extends Component<FormattingProps, FormattingState> {
  render() {
    return (
      <PageHeaderWrapper>
        <BackTop />
        <Card bordered={false}>
          <InfoSection title={"Dates and Times"}>
            <InfoItem
              title={"Date style"}>
              <Select defaultValue="1" style={{ width: 320 }}>
                <Option value="1">January 7, 2020</Option>
                <Option value="2">7 January, 2020</Option>
                <Option value="3">Sunday January 7, 2020</Option>
                <Option value="4">1-7-2020</Option>
                <Option value="5">7-1-2020</Option>
                <Option value="6">2020-7-1</Option>
              </Select>
            </InfoItem>
            <InfoItem
              title={"Date separators"}
            >
              <Radio.Group defaultValue={1}>
                <Radio value={1}>D/M/YYYY</Radio>
                <Radio value={2}>D-M-YYYY</Radio>
                <Radio value={3}>D.M.YYYY</Radio>
              </Radio.Group>
            </InfoItem>
            <InfoItem
              title={"Abbreviate names of days and months"}
            >
              <Switch />
            </InfoItem>
            <InfoItem
              title={"Time style"}
            >
              <Radio.Group defaultValue={1}>
                <Radio value={1}>5:24 PM (12-hour clock)</Radio>
                <Radio value={2}>17:24 PM (24-hour clock)</Radio>
              </Radio.Group>
            </InfoItem>
          </InfoSection>
          <InfoSection title={"Numbers"}>
            <InfoItem
              title={"Separator style"}>
              <Select defaultValue="1" style={{ width: 320 }}>
                <Option value="1">100,000.00</Option>
                <Option value="2">100 000.00</Option>
                <Option value="3">100.000.00</Option>
                <Option value="4">100000.00</Option>
              </Select>
            </InfoItem>
          </InfoSection>
          <InfoSection title={"Currency"}>
            <InfoItem
              title={"Unit of currency"}>
              <Select defaultValue="1" style={{ width: 320 }}>
                <Option value="1">US Dollar</Option>
                <Option value="2">Chinese Yuan</Option>
              </Select>
            </InfoItem>
            <InfoItem
              title={"Unit of currency"}>
              <Select defaultValue="1" style={{ width: 320 }}>
                <Option value="1">US Dollar</Option>
                <Option value="2">Chinese Yuan</Option>
              </Select>
            </InfoItem>
            <InfoItem
              title={"Currency label style"}
            >
              <Radio.Group defaultValue={1}>
                <Radio value={1}>Symbol(CN￥)</Radio>
                <Radio value={2}>Code(CNY)</Radio>
                <Radio value={3}>Name(Chinese Yuan)</Radio>
              </Radio.Group>
            </InfoItem>
            <InfoItem
              title={"Where to display the unit of currency"}
            >
              <Radio.Group defaultValue={1}>
                <Radio value={1}>In the column heading</Radio>
                <Radio value={2}>In every table cell</Radio>
              </Radio.Group>
            </InfoItem>
          </InfoSection>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(

)(Formatting);
