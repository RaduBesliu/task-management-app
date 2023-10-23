import styled from 'styled-components';

export const Components = {
  Container: styled.div<{ top?: number; right?: number; bottom?: number; left?: number }>`
    position: absolute;
    ${({ top }) => top && `top: ${top}px;`}
    ${({ right }) => right && `right: ${right}px;`}
    ${({ bottom }) => bottom && `bottom: ${bottom}px;`}
    ${({ left }) => left && `left: ${left}px;`}

    &:hover {
      cursor: pointer;
    }
  `,
};
