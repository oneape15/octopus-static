import React from 'react';

import styles from './index.less';
import { Divider } from 'antd';

export interface InfoSectionProps {
  title: string;
  description?: string;
}

const InfoSection: React.FC<InfoSectionProps> = (props) => {
  const { title, children } = props;
  return (
    <div className={styles.infoSection}>
      <div className={styles.title}>{title}</div>
      {children}
      <Divider />
    </div>
  );
}

export default InfoSection;