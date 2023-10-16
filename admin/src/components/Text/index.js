import styled from 'styled-components';
import { typography, color, space, } from 'styled-system';

export const Text = styled.p`
  ${typography}
  ${color}
  ${space}
  text-transform: ${({ textTransform }) => textTransform};
`;

Text.defaultProps = {
  variant: 'default',
};