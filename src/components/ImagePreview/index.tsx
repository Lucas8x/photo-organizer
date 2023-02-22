import { useCallback, useMemo } from 'react';

import { PREVIEW_IMAGE } from '../../constants';
import { useApp, useBridge } from '../../hooks';

import {
  Container,
  ImagePath,
  Image,
  FilesCount,
  NoImageMessage,
} from './styles';

export function ImagePreview() {
  const { openInFolder } = useBridge();
  const { currentIndex, filesLength, currentImagePath, isJoyrideRunning } =
    useApp();

  const url = useMemo(
    () => (isJoyrideRunning ? PREVIEW_IMAGE : `file://${currentImagePath}`),
    [isJoyrideRunning, currentImagePath]
  );

  const count = useMemo(
    () =>
      `${currentIndex !== undefined ? currentIndex + 1 : '-'}/${filesLength}`,
    [currentIndex, filesLength]
  );

  const handlePathClick = useCallback(() => {
    if (!currentImagePath) return;
    openInFolder(currentImagePath);
  }, [currentImagePath, openInFolder]);

  return (
    <Container hasImg={!!currentImagePath}>
      {currentImagePath || isJoyrideRunning ? (
        <>
          <ImagePath onClick={handlePathClick}>{currentImagePath}</ImagePath>
          <Image src={url} id='joyride-image' />
          <FilesCount>{count}</FilesCount>
        </>
      ) : (
        <NoImageMessage>NO FOLDER SELECTED</NoImageMessage>
      )}
    </Container>
  );
}
