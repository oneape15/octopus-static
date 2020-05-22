import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

const GlobalFooter: React.FC = (props) => {
  return (
    <DefaultFooter
      copyright="2020 oneape15出品"
      links={[
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