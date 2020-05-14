import React from 'react';

export interface InfoItemProps {
  title: string;
  description?: string;
}

const InfoItem: React.FC<InfoItemProps> = (props) => {
  const { title, description, children } = props;
  return (
    <div>
      <div>{title}</div>
      {children}
    </div>
  );
}

export default InfoItem;