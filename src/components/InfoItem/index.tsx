import React from 'react';

import styles from './index.less';

export interface InfoItemProps {
  title: string;
  description?: string;
}

const InfoItem: React.FC<InfoItemProps> = (props) => {
  const { title, description, children } = props;
  return (
    <div className={styles.infoItem}>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
      {children}
    </div>
  );
}

export default InfoItem;