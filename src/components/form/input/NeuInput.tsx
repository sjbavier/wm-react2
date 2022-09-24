// import { InputProps } from 'antd/lib/input/Input'
import { Input as AntInput } from 'antd';
import styled from 'styled-components';

export const NeuInput = styled(AntInput)`
  padding: 0.7rem 0.5rem;
  border-color:#262a3cbd;
  border-radius: 3px;
  background: #1b1e2b !important;
  background-color: #1b1e2b !important;
  box-shadow: inset 3px 3px 5px #0c0d13, inset -5px -5px 7px #2a2f43;
  // background-color: -internal-light-dark(#1b1e2b), rgba(#1b1e2b)) !important;
  &:focus {
    box-shadow: inset 3px 3px 5px #0c0d13, inset -5px -5px 7px #2a2f43 !important;
  }
  }
`;
