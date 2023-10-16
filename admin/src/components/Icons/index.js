import React from 'react';
import { SvgIcon, Tooltip } from '@material-ui/core';
import styled from 'styled-components';
import { CheckBoxOutlineBlankSharp, CheckBoxSharp } from '@mui/icons-material';
import { safeKey } from '../../common/utils/functions';

export {
  Close
} from '@mui/icons-material';


export const DownIcon = (props) => {
  const { colorUp, colorDown, width, height, padding, margin, ...rest } = props;

  return (
    <SvgIcon
      style={{ width: `${width || 10}`, height: `${height || 12}`, padding: `${padding || 0}`, margin: `${margin || '0 10px 0 10px'}` }}
      {...rest}
      viewBox="0 0 8 10"
    >
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <path
              fill={colorDown || '#4A4A4A'}
              d="M3.938 6L7.875 9.75 0 9.75z"
              transform="translate(-786.000000, -241.000000) translate(786.000000, 241.000000) translate(3.937500, 7.875000) scale(1, -1) translate(-3.937500, -7.875000)"
            />
            <path
              fill={colorUp || '#D1D1D1'}
              d="M3.938 0L7.875 3.75 0 3.75z"
              transform="translate(-786.000000, -241.000000) translate(786.000000, 241.000000)"
            />
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};


export const RecycleBinIcon = (props) => {
  const { color, width, height, padding, margin, strokeWidth, ...rest } = props;

  return (
    <SvgIcon style={{ width: `${width || 24}`, height: `${height || 24}`, padding: `${padding || 0}`, margin: `${margin || 0}` }} {...rest}>
      <g stroke={color ?? '#444'} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 5v18H4V5M1 5h22M12 11v6M8 11v6M16 11v6M8 5V1h8v4" />
      </g>
    </SvgIcon>
  );
};

const IconWrapper = styled.div`
  display: inline-block;
  font-size: ${({ size }) => size || 'inherit'};
  width: ${({ size }) => size || 'auto'};
  height: ${({ size }) => size || 'auto'};
  background-color: ${({ bg }) => bg};
  cursor: ${({ cursor }) => cursor ?? 'pointer'};
  color: ${({ theme, color }) => {
    if (color in theme.colors) {
      return theme.colors[safeKey(color)];
    }

    return theme.colors.icon;
  }};
  svg {
    display: block;
  }
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

function withIconStyle(Icon) {
  const IconWithStyle = (props) => {
    const { size, tooltip, onClick, className, ...rest } = props;
    const cursor = onClick ? 'pointer' : '';

    return tooltip ? (
      <Tooltip title={tooltip}>
        <IconWrapper size={size} cursor={cursor} {...rest}>
          <Icon className={className} fontSize="inherit" color="inherit" onClick={onClick} />
        </IconWrapper>
      </Tooltip>
    ) : (
      <IconWrapper size={size} cursor={cursor} {...rest}>
        <Icon className={className} fontSize="inherit" color="inherit" onClick={onClick} />
      </IconWrapper>
    );
  };

  IconWithStyle.defaultProps = {
    tooltip: null,
  };

  return IconWithStyle;
}

export const CheckBoxBlankIcon = withIconStyle(CheckBoxOutlineBlankSharp);

export const CheckBoxIcon = withIconStyle(CheckBoxSharp);

export const ArrowDownward = (props) => {
  const { ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...rest} viewBox="0 0 13 8">
      <g fill="none" fillRule="evenodd" strokeLinecap="square">
        <g strokeWidth="2">
          <path d="M525 137L529.5 141 534 137" transform="translate(-523 -135)" />
        </g>
      </g>
    </svg>
  );
};

export const ArrowDownwardIcon = withIconStyle(ArrowDownward);
