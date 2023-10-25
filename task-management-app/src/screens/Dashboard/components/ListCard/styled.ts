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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,

  Title: styled.h2<{ textColor: string }>`
    color: ${(props) => props.textColor};
    text-align: center;
    font-weight: bold;
  `,

  CreateTaskButton: styled.div`
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background-color: #34c227;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
