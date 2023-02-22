import { Header } from '../../components/Header';
import { ImagePreview } from '../../components/ImagePreview';
import { BasicControls } from '../../components/BasicControls';
import { KeybindsDisplay } from '../../components/KeybindsDisplay';
import { ModalAddKeybind } from '../../components/ModalAddKeybind';

import { useApp } from '../../hooks';

import { Container } from './styles';

export function Home() {
  const {
    changeFolder,
    currentImagePath,
    isModalKeybindOpen,
    setIsModalKeybindOpen,
    isJoyrideRunning,
  } = useApp();

  return (
    <>
      <Container>
        <Header onChange={changeFolder} />

        <ImagePreview />
        {(currentImagePath || isJoyrideRunning) && <BasicControls />}

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
