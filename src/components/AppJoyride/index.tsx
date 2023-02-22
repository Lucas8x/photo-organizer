import { useCallback } from 'react';
import Joyride, { CallBackProps, STATUS, Step, Styles } from 'react-joyride';

import { useApp } from '../../hooks';

const STYLES: Styles = {
  options: {
    zIndex: 10000,
  },
};

const STEPS: Step[] = [
  {
    content: <h3>Welcome :)</h3>,
    locale: { skip: <strong>Skip</strong> },
    showSkipButton: true,
    placement: 'center',
    target: 'body',
  },
  {
    content: <h3>First select some image folder</h3>,
    spotlightPadding: 10,
    target: '#joyride-input',
  },
  {
    content: <h3>Images will show here</h3>,
    spotlightPadding: 10,
    target: '#joyride-image',
  },
  {
    content: <h3>Control images with these keys</h3>,
    spotlightPadding: 10,
    target: '#joyride-controls',
  },
  {
    content: <h3>Register your folders keybind here</h3>,
    spotlightPadding: 0,
    target: '#joyride-keybinds',
  },
];

const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

export function AppJoyride() {
  const { isJoyrideRunning, setIsJoyrideRunning } = useApp();

  const handleJoyrideCallback = useCallback(
    (data: CallBackProps) => {
      const { status, index } = data;

      if (finishedStatuses.includes(status)) {
        setIsJoyrideRunning(false);
      }
    },
    [setIsJoyrideRunning]
  );

  return (
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    /* @ts-ignore */
    <Joyride
      disableScrolling
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={isJoyrideRunning}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={STEPS}
      styles={STYLES}
    />
  );
}
