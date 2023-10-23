import styled from 'styled-components';

export const Components = {
  Container: styled.div<{ color: string }>`
    width: 384px;
    min-height: 256px;
    border-radius: 16px;
    background-color: ${(props) => props.color};
    padding: 16px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    position: relative;
  `,

  Title: styled.h2<{ textColor: string }>`
    color: ${(props) => props.textColor};
    text-align: center;
    font-weight: bold;
  `,
};
