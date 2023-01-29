import { Container, Title, Controls, Control } from './styles';

const CONTROLS = [
  { key: 'ArrowLeft', description: 'Previous Image' },
  { key: 'ArrowRight', description: 'Next Image' },
];

export function BasicControls() {
  return (
    <Container>
      <Title>Basic Controls</Title>

      <Controls>
        {CONTROLS.map((i) => (
          <Control key={i.key}>
            <b>{i.key}</b> - {i.description}
          </Control>
        ))}
      </Controls>
    </Container>
  );
}
