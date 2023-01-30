// import { InputProps } from 'antd/lib/input/Input'
import { Input as AntInput } from 'antd';
import styled from 'styled-components';

// self calling to satisfy return type of StyledComponent<typeof AntInput, any, {}, never>
export const NeuInput = (() => {
  return styled(AntInput)`
    padding: 0.7rem 0.5rem;
    border-color: transparent;
    border-radius: 3px;
    box-shadow: inset 0px 3px 5px hsla(0, 0%, 0%, 0.2),
      inset 0px -5px 5px hsla(0, 0%, 0%, 0.3);

    &:focus {
      box-shadow: none;
    }
    &:-internal-autofill-selected {
      background-color: -internal-light-dark(
        transparent,
        transparent
      ) !important;
      color: -internal-light-dark(transparent, transparent);
    }
    &:-webkit-autofill,
    -webkit-autofill:focus {
      transition: background-color 600000s 0s, color 600000s 0s;
    }
  `;
})();
