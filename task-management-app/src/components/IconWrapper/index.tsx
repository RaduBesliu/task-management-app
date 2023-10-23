import React from 'react';
import { Components } from './styled';

// @ts-ignore
const IconWrapper = ({
  children,
  top,
  right,
  bottom,
  left,
  onClick,
}: {
  children: React.ReactNode;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  onClick?: () => void | Promise<void>;
}) => {
  return (
    <Components.Container top={top} right={right} bottom={bottom} left={left} onClick={onClick}>
      {children}
    </Components.Container>
  );
};

export default IconWrapper;
