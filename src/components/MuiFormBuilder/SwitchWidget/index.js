import React from 'react';
import { schemaRequiresTrueValue } from "@rjsf/utils";

import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const SwitchWidget = (props) => {
  const { rawErrors, options } = props;
  const {
    schema,
    id,
    value,
    disabled,
    readonly,
    label,
    autofocus,
    onChange,
    onBlur,
    onFocus,
  } = props;

  const required = schemaRequiresTrueValue(schema);

  const _onChange = (_, checked) => onChange(checked);
  const _onBlur = ({
    target: { value },
  }) => onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }) => onFocus(id, value);

  return (
    <>
      <FormControlLabel
        sx={{
          mr: 0,
          ml: 0,
          height: 54,
          px: 1,
          justifyContent: 'space-between',
          border: `1px solid ${grey[300]}`,
          borderRadius: 2,
        }}
        labelPlacement="start"
        label={<Typography color={grey[500]} variant="subtitle1">{label}</Typography>}
        control={
          <IOSSwitch
            id={id}
            name={id}
            checked={typeof value === "undefined" ? false : Boolean(value)}
            required={required}
            disabled={disabled || readonly}
            autoFocus={autofocus}
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
          />
        }
      />
    </>
  );
};

export default SwitchWidget;
