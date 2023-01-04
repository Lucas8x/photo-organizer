import { Header } from '../../components/Header';
import { ImagePreview } from '../../components/ImagePreview';
import { KeybindsDisplay } from '../../components/KeybindsDisplay';
import { ModalAddKeybind } from '../../components/ModalAddKeybind';

import { useApp } from '../../hooks';
import { Container } from './styles';

export function Home() {
  const {
    changeFolder,
    currentImagePath,
    currentIndex,
    filesLength,
    isModalKeybindOpen,
    setIsModalKeybindOpen,
  } = useApp();

  return (
    <>
      <Container>
        <Header onChange={changeFolder} />
        <ImagePreview
          imagePath={currentImagePath}
          count={`${
            currentIndex !== undefined ? currentIndex + 1 : '-'
          }/${filesLength}`}
        />
        <KeybindsDisplay onOpenModal={() => setIsModalKeybindOpen(true)} />
      </Container>

      {isModalKeybindOpen && (
        <ModalAddKeybind
          isOpen={isModalKeybindOpen}
          onClose={() => setIsModalKeybindOpen(false)}
        />
      )}
    </>
  );
}
