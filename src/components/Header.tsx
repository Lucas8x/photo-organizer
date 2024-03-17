import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { InputPath } from './InputPath';
import { QuickSettingsDisplay } from './QuickSettingsDisplay';
import { useApp } from '../contexts/appContext';

export function Header() {
  const { currentFolderPath, changeFolder } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <header
      className="flex w-full flex-col bg-zinc-900 p-4 pt-0 data-[collapsed=true]:p-0"
      data-collapsed={collapsed}
    >
      <button
        className="flex justify-center text-white"
        onClick={() => setCollapsed((s) => !s)}
        title={collapsed ? 'Expand Header' : 'Collapse Header'}
      >
        {collapsed ? <IoChevronUp /> : <IoChevronDown />}
      </button>

      {!collapsed && (
        <div className="flex flex-col gap-2">
          <span className="font-bold text-white">
            Paste or select folder path
          </span>

          <InputPath
            value={currentFolderPath}
            onChange={changeFolder}
            //id="joyride-input"
          />

          <QuickSettingsDisplay />
        </div>
      )}
    </header>
  );
}
