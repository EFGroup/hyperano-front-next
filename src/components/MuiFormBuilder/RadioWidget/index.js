import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const RadioWidget = ({
  id,
  schema,
  options,
  value,
  required,
  disabled,
  readonly,
  label,
  onChange,
  onBlur,
  onFocus,
}) => {
  const { enumOptions, enumDisabled } = options;

  const _onChange = (_, value) =>
    onChange(schema.type == "boolean" ? value !== "false" : value);
  const _onBlur = ({ target: { value } }) =>
    onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }) => onFocus(id, value);

  const row = options ? options.inline : false;

  return (
    <>
      <FormLabel required={required} htmlFor={id}>
        {label || schema.title}
      </FormLabel>
      <RadioGroup
        id={id}
        name={id}
        value={`${value}`}
        row={row}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
      >
        {Array.isArray(enumOptions) &&
          enumOptions.map((option) => {
            const itemDisabled =
              Array.isArray(enumDisabled) &&
              enumDisabled.indexOf(option.value) !== -1;
            const radio = (
              <FormControlLabel
                control={
                  <Radio
                    name={id}
                    id={`${id}-${option.value}`}
                    color="primary"
                  />
                }
                label={`${option.label}`}
                value={`${option.value}`}
                key={option.value}
                disabled={disabled || itemDisabled || readonly}
              />
            );

            return radio;
          })}
      </RadioGroup>
    </>
  );
};

export default RadioWidget;
