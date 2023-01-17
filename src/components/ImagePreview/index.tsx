import { useCallback, useMemo } from 'react';

import { useBridge } from '../../hooks';

import {
  Container,
  ImagePath,
  Image,
  FilesCount,
  NoImageMessage,
} from './styles';

interface Props {
  imagePath: string | undefined;
  count: string;
}

export function ImagePreview({ imagePath, count }: Props) {
  const { openInFolder } = useBridge();

  const url = useMemo(() => `file://${imagePath}`, [imagePath]);

  const handlePathClick = useCallback(() => {
    if (!imagePath) return;
    openInFolder(imagePath);
  }, [imagePath, openInFolder]);

  return (
    <Container hasImg={!!imagePath}>
      {imagePath ? (
        <>
          <ImagePath onClick={handlePathClick}>{imagePath}</ImagePath>
          <Image src={url} />
          <FilesCount>{count}</FilesCount>
        </>
      ) : (
        <NoImageMessage>NO FOLDER SELECTED</NoImageMessage>
      )}
    </Container>
  );
}
