import { FormattedMessage, useIntl } from 'react-intl';
import Joyride, { STATUS } from 'react-joyride';
import { useJoyride } from '../store';

const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

export function AppJoyride() {
  const intl = useIntl();
  const isJoyrideRunning = useJoyride((s) => s.isJoyrideRunning);
  const setIsJoyrideRunning = useJoyride((s) => s.setIsJoyrideRunning);

  return (
    <Joyride
      run={isJoyrideRunning}
      callback={(p) => {
        if (finishedStatuses.includes(p.status)) {
          setIsJoyrideRunning(false);
        }
      }}
      steps={[
        {
          content: (
            <h3 className="font-semibold">
              <FormattedMessage id="joyride.welcome" /> 😊
            </h3>
          ),
          placement: 'center',
          target: 'body',
        },
        {
          content: (
            <h3 className="font-semibold">
              <FormattedMessage id="joyride.select" />
            </h3>
          ),
          spotlightPadding: 10,
          target: '#joyride-folder-input',
        },
        {
          content: (
            <h3 className="font-semibold">
              <FormattedMessage id="joyride.image" />
            </h3>
          ),
          spotlightPadding: 10,
          target: '#joyride-image',
        },
        {
          content: (
            <h3 className="font-semibold">
              <FormattedMessage id="joyride.controls" />
            </h3>
          ),
          placement: 'center',
          target: 'body',
        },
        {
          content: (
            <h3 className="font-semibold">
              <FormattedMessage id="joyride.register" />
            </h3>
          ),
          spotlightPadding: 0,
          target: '#joyride-keybinds',
        },
        {
          content: (
            <h3 className="font-semibold">
              <FormattedMessage id="joyride.press" />
            </h3>
          ),
          spotlightPadding: 10,
          target: '#joyride-example-keybind',
        },
      ]}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
      locale={{
        back: intl.formatMessage({ id: 'joyride.back' }),
        next: intl.formatMessage({ id: 'joyride.next' }),
        skip: intl.formatMessage({ id: 'joyride.skip' }),
        last: intl.formatMessage({ id: 'joyride.last' }),
      }}
      continuous
      disableScrolling
      hideCloseButton
      scrollToFirstStep
      showProgress
      showSkipButton
    />
  );
}
