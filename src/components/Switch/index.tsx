import RSwitch from 'react-switch';

interface Props {
  onChange: () => void;
  checked: boolean;
}

export function Switch({ onChange, checked }: Props) {
  return (
    <RSwitch
      onChange={onChange}
      checked={checked}
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
