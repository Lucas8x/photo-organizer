import styled, { css } from 'styled-components';
import { Question } from 'styled-icons/bootstrap';

export const Container = styled.div`
  display: flex;
  gap: 6px;
`;

const PreviewStyle = css`
  width: 45px;
  height: 45px;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
`;

export const Preview = styled.img`
  ${PreviewStyle}
  image-rendering: -webkit-optimize-contrast;
`;

export const FakePreview = styled.div`
  ${PreviewStyle}
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

export const Keybind = styled.span`
  color: #fff;

  > b {
    text-transform: uppercase;
  }
`;

export const Path = styled.span`
  color: #fff;
  cursor: pointer;
`;

export const QuestionIcon = styled(Question)`
  width: 30px;
  height: 30px;
`;
