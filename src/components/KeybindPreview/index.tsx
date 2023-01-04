import { useBridge } from '../../hooks';

import { Container, Preview, Details, Keybind, Path } from './styles';

interface Props {
  keybind: string;
  path: string;
  showPreview?: boolean;
}

export function KeybindPreview({ keybind, path, showPreview }: Props) {
  const { openFolder } = useBridge();
  const pathName = path.replace('\\', '/').split('/').reverse()[0];

  function handleClick() {
    openFolder(path);
  }

  return (
    <Container>
      {showPreview && <Preview onClick={handleClick} />}

      <Details>
        <Keybind>
          Keybind: <b>{keybind}</b>
        </Keybind>

        <Path onClick={handleClick}>{pathName}</Path>
      </Details>
    </Container>
  );
}
