import { HexColorPicker } from 'react-colorful';

export const Color = ({
  color,
  setColor,
  className
}: {
  color: string;
  setColor: any;
  className: string;
}) => {
  return (
    <div className={className}>
      <HexColorPicker color={color} onChange={setColor} />
    </div>
  );
};
