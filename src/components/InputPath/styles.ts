import styled from 'styled-components';
import { Folder } from '@styled-icons/bootstrap';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Input = styled.input`
  display: flex;
  width: 100%;

  padding: 10px 0 10px 10px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  outline: none;

  font-size: 14px;
`;

export const FolderIcon = styled(Folder)`
  width: 25px;
  height: 25px;
  color: #fff;
  cursor: pointer;
`;
