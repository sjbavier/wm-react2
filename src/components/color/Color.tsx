import { HexColorPicker } from 'react-colorful';

export const Color = ({
  color,
  setColor
}: {
  color: string;
  setColor: any;
}) => {
  return <HexColorPicker color={color} onChange={setColor} />;
};
