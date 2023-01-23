import { useState, useCallback } from 'react';
import Joyride, { CallBackProps, STATUS, Step, Styles } from 'react-joyride';

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
];

const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

export function AppJoyride() {
  const [isRunning, setIsRunning] = useState(true);

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, index } = data;

    if (finishedStatuses.includes(status)) {
      setIsRunning(false);
    }
  }, []);

  return (
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    /* @ts-ignore */
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={isRunning}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={STEPS}
      styles={STYLES}
    />
  );
}
