import React from "react";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import { rangeSpec } from "@rjsf/utils";

const RangeWidget = ({
  value,
  readonly,
  disabled,
  onBlur,
  onFocus,
  options,
  schema,
  onChange,
  required,
  label,
  id,
}) => {
  const sliderProps = { value, label, id, name: id, ...rangeSpec(schema) };

  const _onChange = (_, value) => {
    onChange(value ? options.emptyValue : value);
  };
  const _onBlur = ({ target: { value } }) =>
    onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }) => onFocus(id, value);

  return (
    <>
      <FormLabel required={required} id={id}>
        {label}
      </FormLabel>
      <Slider
        disabled={disabled || readonly}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        valueLabelDisplay="auto"
        {...sliderProps}
      />
    </>
  );
};

export default RangeWidget;
