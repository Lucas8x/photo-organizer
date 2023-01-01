import { InputPath } from '../InputPath';
import { Container, InstructionText } from './styles';

interface Props {
  onChange: (path: string) => void;
}

export function Header({ onChange }: Props) {
  return (
    <Container>
      <InstructionText>Paste or select folder path</InstructionText>

      <InputPath onChange={onChange} />
    </Container>
  );
}
