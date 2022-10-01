import { Button } from 'antd';
import styled from 'styled-components';

export const NeuNavButton = styled((props) => <Button {...props} />)`
  margin-top: 1rem;
  border-radius: 0px;
  border: transparent;
  background: linear-gradient(145deg, #1d202e, #181b27);
  box-shadow: 3px 3px 7px #0b0c11, -3px -3px 9px #2b3045;
`;
