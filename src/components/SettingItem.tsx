type Props = {
  children: React.ReactNode;
};

function Root({ children }: Props) {
  return (
    <div className="rounded border-2 border-dashed border-neutral-300 px-4 py-2 dark:border-white/70">
      <div className="flex items-center justify-between">{children}</div>
    </div>
  );
}

function Title({ children }: Props) {
  return <h2 className="font-semibold">{children}</h2>;
}

function Description({ children }: Props) {
  return <span className="text-sm opacity-80">{children}</span>;
}

export const SettingItem = {
  Root,
  Title,
  Description,
};
