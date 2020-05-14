import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const GlobalFooter: React.FC = (props) => {
  return (
    <DefaultFooter
      copyright="2020 oneape15出品"
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'OCTOPUS',
          title: 'OCTOPUS',
          href: 'https://www.baidu.com/s?wd=oneape15',
          blankTarget: true,
        },
      ]}
    />
  );
}

export default GlobalFooter;