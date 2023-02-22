import { Switch } from '../Switch';
import { Container, Label } from './styles';

interface Props {
  text: string;
  title?: string;
  onChange: () => void;
  checked: boolean;
}

export function SwitchLabeled({ text, title, onChange, checked }: Props) {
  return (
    <Container title={title}>
      <Label>{text}</Label>
      <Switch onChange={onChange} checked={checked} />
    </Container>
  );
}
