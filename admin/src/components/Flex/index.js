import styled from 'styled-components';
import { flexbox, space, layout, border, } from 'styled-system';



const Flex = styled.div`
  ${flexbox}
  ${space}
  ${layout}
  ${border}
  display: flex;
`;

Flex.defaultProps = {
  
};

export default Flex;
