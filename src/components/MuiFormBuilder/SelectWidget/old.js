import React from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { processSelectValue } from "@rjsf/utils";

const SelectWidget = ({
  schema,
  id,
  options,
  label,
  required,
  disabled,
  readonly,
  value,
  multiple,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  rawErrors = [],
}) => {
  const { enumOptions, enumDisabled } = options;

  const emptyValue = multiple ? [] : "";

  const _onChange = ({
    target: { value },
  }) =>
    onChange(processSelectValue(schema, value, options));
  const _onBlur = ({ target: { value } }) =>
    onBlur(id, processSelectValue(schema, value, options));
  const _onFocus = ({
    target: { value },
  }) =>
    onFocus(id, processSelectValue(schema, value, options));

  return (
    <TextField
      id={id}
      name={id}
      label={label || schema.title}
      select
      value={typeof value === "undefined" ? emptyValue : value}
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      error={rawErrors.length > 0}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      InputLabelProps={{
        shrink: true,
      }}
      SelectProps={{
        multiple: typeof multiple === "undefined" ? false : multiple,
      }}
      fullWidth
    >
      {(enumOptions).map(({ value, label }, i) => {
        const disabled =
          enumDisabled && (enumDisabled).indexOf(value) != -1;
        return (
          <MenuItem dir="rtl" key={i} value={value} disabled={disabled}>
            {label}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWidget;
