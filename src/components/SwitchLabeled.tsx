import { Switch } from './Switch';

interface Props {
  text: string;
  title?: string;
  onChange: () => void;
  checked: boolean;
  disabled?: boolean;
}

export function SwitchLabeled({ text, title, ...rest }: Props) {
  return (
    <div className="flex flex-col items-center gap-1" title={title}>
      <span className="text-center text-sm font-bold text-white">{text}</span>
      <Switch {...rest} />
    </div>
  );
}
