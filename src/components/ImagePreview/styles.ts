import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  width: 90%;
  padding: 20px;
  height: 100%;
  max-height: 800px;

  border-radius: 10px;
  background-color: #262626;
`;

export const ImagePath = styled.span`
  font-weight: bold;
  color: #fff;
  cursor: pointer;
`;

export const Image = styled.img`
  width: auto;
  max-width: 100%;

  height: auto;
  max-height: 700px;

  border-radius: 10px;
`;

export const FilesCount = styled.span`
  font-weight: bold;
  color: #fff;
`;
