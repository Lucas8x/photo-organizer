import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;

  background-color: #262626;
`;

export const KeybindContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 4px;
`;

export const CurrentKeybind = styled.span`
  color: #fff;
`;

export const Keycap = styled.span`
  align-self: center;
  padding: 2px 4px;

  border-radius: 3px;
  border: 1px solid #b4b4b4;

  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;

  color: #333;
  background-color: #eee;
`;

export const InputPathContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  gap: 6px;
`;

export const Text = styled.span`
  font-weight: bold;
  color: #fff;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 30px;
`;

const Button = styled.button`
  width: fit-content;
  padding: 10px 20px;
  border-radius: 10px;

  font-weight: bold;
  font-size: 16px;

  color: #fff;

  :hover,
  :active {
    scale: 0.9;
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ConfirmButton = styled(Button)`
  background-color: green;
`;

export const CloseButton = styled(Button)`
  background-color: red;
`;
