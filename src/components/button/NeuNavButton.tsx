import { Button } from 'antd';
import styled from 'styled-components';

export const NeuNavButton = styled((props) => <Button {...props} />)`
  margin-top: 0.875rem;
  border: transparent;
  background: linear-gradient(
    -45deg,
    hsla(0, 0%, 0%, 0.1) 0%,
    hsla(0, 0%, 50%, 0.1) 100%
  );
  padding: 1.4rem 1.2rem;
  box-shadow: 6px 6px 7px hsla(0, 0%, 0%, 0.3);
`;
