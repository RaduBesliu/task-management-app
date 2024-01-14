import styled from 'styled-components';

export const Components = {
  Container: styled.div<{ color: string; textColor: string; isCompleted: boolean }>`
    width: 100%;
    height: 96px;
    border-radius: 16px;
    background-color: ${({ color }) => color};
    color: ${({ textColor }) => textColor};
    padding: 8px;
    position: relative;
    text-decoration: ${({ isCompleted }) => (isCompleted ? 'line-through' : 'none')};
    opacity: ${({ isCompleted }) => (isCompleted ? 0.5 : 1)};
  `,

  CardTitle: styled.h2`
    font-size: 16px;
    font-weight: bold;
  `,

  CardDescription: styled.p`
    font-size: 14px;
  `,
};
