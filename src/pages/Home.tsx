import packageJson from '../../package.json';
import { BasicControls } from '../components/BasicControls';
import { Header } from '../components/Header';
import { ImagePreview } from '../components/ImagePreview';
import { KeybindsDisplay } from '../components/KeybindsDisplay';
import { useApp } from '../contexts/appContext';
import { useJoyride } from '../store';

export function Home() {
  const { currentImagePath } = useApp();
  const isJoyrideRunning = useJoyride((s) => s.isJoyrideRunning);

  return (
    <div className="flex w-full max-w-full flex-col items-center justify-between overflow-hidden bg-zinc-800">
      <Header />

      <div className="flex h-full w-full flex-col justify-between p-2">
        <ImagePreview />
        {(currentImagePath || isJoyrideRunning) && <BasicControls />}
      </div>

      <KeybindsDisplay />

      <div className="relative w-full">
        <span className="absolute bottom-0 right-0 text-xs font-bold leading-none text-white">
          v{packageJson.version}
        </span>
      </div>
    </div>
  );
}
