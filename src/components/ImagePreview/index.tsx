import { useBridge } from '../../hooks/useBridge';

import { Container, ImagePath, Image, FilesCount } from './styles';

interface Props {
  imagePath: string | undefined;
  count: string;
}

export function ImagePreview({ imagePath, count }: Props) {
  const { openInFolder } = useBridge();

  const url = `file://${imagePath}`;

  function handlePathClick() {
    if (!imagePath) return;
    openInFolder(imagePath);
  }

  return (
    <Container>
      <ImagePath onClick={handlePathClick}>{imagePath}</ImagePath>
      <Image src={url} />
      <FilesCount>{count}</FilesCount>
    </Container>
  );
}
