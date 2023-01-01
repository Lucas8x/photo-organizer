import RSwitch from 'react-switch';
import { useContext } from 'react';

import { AppContext } from '../../contexts/appContext';

export function Switch() {
  const { isMovingFiles, switchCopyOrMove } = useContext(AppContext);

  return (
    <RSwitch
      onChange={switchCopyOrMove}
      checked={isMovingFiles}
      height={25}
      width={50}
      handleDiameter={15}
      checkedIcon={false}
      uncheckedIcon={false}
      /* offColor={colors.switch.bg}
      onColor={colors.switch.bg}
      offHandleColor={colors.switch.handle}
      onHandleColor={colors.switch.handle} */
    />
  );
}
