import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function ModalBase({ children }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-950/60">
      {children}
    </div>
  );
}
