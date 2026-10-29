import { AppJoyride } from '@/components/AppJoyride';
import { FooterBar } from '@/components/FooterBar';
import { Header } from '@/components/Header';
import { ImagePreview } from '@/components/ImagePreview';
import { KeybindsDisplay } from '@/components/KeybindsDisplay';
import { SideButton } from '@/components/SideButton';
import { useKeyboardShortcuts, useStoredKeybinds } from '@/hooks';
import { useFiles } from '@/store';

export function Home() {
  const decreaseIndex = useFiles((s) => s.decreaseIndex);
  const increaseIndex = useFiles((s) => s.increaseIndex);

  return (
    <>
      <div className='flex w-full max-w-full flex-col items-center justify-between overflow-hidden bg-neutral-100 dark:bg-zinc-800'>
        <Header />

        <div className='flex h-full w-full'>
          <SideButton onClick={decreaseIndex} tooltipID='controls.previous'>
            {'<'}
          </SideButton>

          <PreviewWrapper />

          <SideButton onClick={increaseIndex} tooltipID='controls.next'>
            {'>'}
          </SideButton>
        </div>

        <KeybindsDisplay />
        <FooterBar />
      </div>

      <AppJoyride />
    </>
  );
}

function PreviewWrapper() {
  useKeyboardShortcuts();
  useStoredKeybinds();

  return <ImagePreview />;
}
