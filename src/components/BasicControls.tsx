const CONTROLS = [
  { key: 'ArrowLeft', description: 'Previous Image' },
  { key: 'ArrowRight', description: 'Next Image' },
];

export function BasicControls() {
  return (
    <div className="flex flex-col items-center" id="joyride-controls">
      {/* <span className="font-bold text-white">Basic Controls</span> */}

      <div className="flex gap-2">
        {CONTROLS.map((i) => (
          <span key={i.key} className="text-white">
            <b>{i.key}</b> - {i.description}
          </span>
        ))}
      </div>
    </div>
  );
}
