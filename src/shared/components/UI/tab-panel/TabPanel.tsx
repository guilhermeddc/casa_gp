import React from 'react';

interface IPros {
  index: number;
  value: number;
  children: React.ReactNode;
}

export const TabPanel: React.FC<IPros> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <>{children}</>}
    </div>
  );
};
