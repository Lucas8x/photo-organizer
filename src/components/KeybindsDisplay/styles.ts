import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 20px 0;

  background-color: #1b1c1d;
`;

export const KeybindsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const Message = styled.span`
  font-weight: bold;
  color: #fff;
`;

export const AddButton = styled.button`
  width: fit-content;
  padding: 10px 20px;
  border-radius: 10px;

  font-weight: bold;
  font-size: 16px;

  color: #fff;
  background-color: green;
`;
