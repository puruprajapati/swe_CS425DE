import React from 'react';
import { variant } from 'styled-system';
import styled from 'styled-components';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { typography, color, space, } from 'styled-system';

const sizes = {
  xs: {
    margin: '0.25rem 0.875rem',
    fontSize: '12px',
    fontWeight: 700,
  },
  sm: {
    margin: '0.5rem 1rem',
    fontSize: '14px',
    fontWeight: 700,
  },
  md: {
    margin: '0.875rem 2.5rem',
    fontSize: '14px',
    fontWeight: 700,
  },
  lg: {
    margin: '1.125rem 2.5rem',
    fontSize: '14px',
    fontWeight: 700,
  },
};

export const StatusVariants = {
  active: 'active',
  deactivate: 'deactivate',
  pending: 'pending',
}

const variants = {
  [StatusVariants.active]: {
    backgroundColor: 'rgba(84, 214, 44, 0.16)',
    color: '#229a16',
    
  },
  [StatusVariants.deactivate]: {
    backgroundColor: 'rgba(255, 72, 66, 0.16)',
    color: 'rgb(183, 33, 54)'
  },
  [StatusVariants.pending]: {
    backgroundColor: 'rgb(255, 248, 225)',
    color: 'rgb(255, 193, 7)'
  },
}

export const StatusSizes = {
  xs: 'xs', 
  sm: 'sm', 
  md: 'md', 
  lg: 'lg',
};

const StyledBox = styled(Box)`
  ${() => variant({ variants: variants })};
  width: ${({ block = true }) => (block ? '100%' : 'auto')};
  display: ${({ block = true }) => (block ? 'block' : 'inline-block')};
  border-radius: 0.5rem;
`;

const StyledText = styled.p`
  ${typography}
  ${color}
  ${space}
  text-transform: ${({ textTransform }) => textTransform};
  text-align: center;
  font-size: ${({ size = 'md' }) => sizes[size].fontSize};
  font-weight: ${({ size = 'md' }) => sizes[size].fontWeight};
  margin: ${({ size = 'md' }) => sizes[size].margin};
  min-width: 3rem;
`;

function StatusView({ size, title, variant, ...rest }) {

  return (
    <StyledBox variant={variant} {...rest}>
      <StyledText size={size}>{title}</StyledText>
    </StyledBox>
  );
}

StatusView.defaultProps = {
  size: 'xs',
  variant: 'active',
  block: false,
};

StatusView.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  block: PropTypes.bool,
}

export default StatusView;
