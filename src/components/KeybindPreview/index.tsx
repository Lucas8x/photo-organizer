import { useMemo } from 'react';

import { useBridge } from '../../hooks';

import {
  Container,
  Preview,
  FakePreview,
  Details,
  Keybind,
  Path,
  QuestionIcon,
} from './styles';

interface Props {
  keybind: string;
  path: string;
  showPreview?: boolean;
  previewPath?: string;
}

export function KeybindPreview({
  keybind,
  path,
  previewPath,
  showPreview,
}: Props) {
  const { openFolder } = useBridge();
  const pathName = useMemo(
    () => path.replace('\\', '/').split('/').reverse()[0],
    [path]
  );

  const url = useMemo(() => `file://${previewPath}`, [previewPath]);

  function handleClick() {
    openFolder(path);
  }

  return (
    <Container>
      {showPreview &&
        (previewPath ? (
          <Preview src={url} onClick={handleClick} title='Open folder' />
        ) : (
          <FakePreview>
            <QuestionIcon onClick={handleClick} title='Open folder' />
          </FakePreview>
        ))}

      <Details>
        <Keybind>
          Keybind: <b>{keybind}</b>
        </Keybind>

        <Path onClick={handleClick} title='Open folder'>
          {pathName}
        </Path>
      </Details>
    </Container>
  );
}
