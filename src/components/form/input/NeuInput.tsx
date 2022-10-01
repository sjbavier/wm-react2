// import { InputProps } from 'antd/lib/input/Input'
import { Input as AntInput } from 'antd';
import styled from 'styled-components';

export const NeuInput = styled(AntInput)`
  padding: 0.7rem 0.5rem;
  border-color: #262a3cbd;
  border-radius: 3px;
  background: #1b1e2b !important;
  background-color: #1b1e2b !important;
  box-shadow: inset 3px 3px 5px #0c0d13, inset -5px -5px 7px #2a2f43;
  &:focus {
    box-shadow: inset 3px 3px 5px #0c0d13, inset -5px -5px 7px #2a2f43 !important;
  }
  &:-internal-autofill-selected {
    background-color: -internal-light-dark(#1b1e2b, #1b1e2b) !important;
    color: -internal-light-dark(
      rgba(255, 255, 255, 0.85),
      rgba(255, 255, 255, 0.85)
    );
  }
  &:-webkit-autofill,
  -webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
`;
