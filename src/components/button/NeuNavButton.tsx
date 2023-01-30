import { Button } from 'antd';
import styled from 'styled-components';

export const NeuNavButton = styled((props) => <Button {...props} />)`
  margin-top: 1rem;
  border-radius: 0px;
  border: transparent;
  box-shadow: 6px 6px 10px hsla(0, 0%, 0%, 0.4),
    -6px -6px 10px hsla(0, 0%, 30%, 0.2);
`;
