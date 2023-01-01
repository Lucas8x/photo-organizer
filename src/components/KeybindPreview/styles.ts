import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 6px;
`;

export const Preview = styled.img`
  width: 45px;
  height: 45px;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

export const Keybind = styled.span`
  color: #fff;
`;

export const Path = styled.span`
  color: #fff;
  cursor: pointer;
`;
