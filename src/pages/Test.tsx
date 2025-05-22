import { useSettings } from '@/store';
import { Button } from '@/ui/button';

export function TestPage() {
  const theme = useSettings((s) => s.theme);
  const changeTheme = useSettings((s) => s.changeTheme);

  return (
    <div className="flex w-full max-w-full flex-col items-center justify-between overflow-hidden bg-white dark:bg-zinc-800">
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => {
            changeTheme(theme === 'dark' ? 'light' : 'dark');
          }}
        >
          theme switch
        </Button>

        <Button>Default</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
        <Button variant="outline">outline</Button>
        <Button variant="secondary">secondary</Button>
      </div>
    </div>
  );
}
