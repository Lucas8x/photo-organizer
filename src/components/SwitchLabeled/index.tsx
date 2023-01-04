import { Switch } from '../Switch';
import { Container, Label } from './styles';

interface Props {
  title: string;
  onChange: () => void;
  checked: boolean;
}

export function SwitchLabeled({ title, onChange, checked }: Props) {
  return (
    <Container>
      <Label>{title}</Label>
      <Switch onChange={onChange} checked={checked} />
    </Container>
  );
}
