import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";

const selectValue = (value, selected, all) => {
  const at = all.indexOf(value);
  const updated = selected.slice(0, at).concat(value, selected.slice(at));

  // As inserting values at predefined index positions doesn't work with empty
  // arrays, we need to reorder the updated selection to match the initial order
  return updated.sort((a, b) => all.indexOf(a) > all.indexOf(b));
};

const deselectValue = (value, selected) => {
  return selected.filter((v) => v !== value);
};

const CheckboxesWidget = ({
  schema,
  label,
  id,
  disabled,
  options,
  value,
  autofocus,
  readonly,
  required,
  onChange,
  onBlur,
  onFocus,
}) => {
  const { enumOptions, enumDisabled, inline } = options;

  const _onChange =
    (option) =>
    ({ target: { checked } }) => {
      const all = (enumOptions).map(({ value }) => value);

      if (checked) {
        onChange(selectValue(option.value, value, all));
      } else {
        onChange(deselectValue(option.value, value));
      }
    };

  const _onBlur = ({
    target: { value },
  }) => onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }) => onFocus(id, value);

  return (
    <>
      <FormLabel required={required} htmlFor={id}>
        {label || schema.title}
      </FormLabel>
      <FormGroup id={id} row={!!inline}>
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, index) => {
            const checked = value.indexOf(option.value) !== -1;
            const itemDisabled =
              Array.isArray(enumDisabled) &&
              enumDisabled.indexOf(option.value) !== -1;
            const checkbox = (
              <Checkbox
                id={`${id}-${option.value}`}
                name={id}
                checked={checked}
                disabled={disabled || itemDisabled || readonly}
                autoFocus={autofocus && index === 0}
                onChange={_onChange(option)}
                onBlur={_onBlur}
                onFocus={_onFocus}
              />
            );
            return (
              <FormControlLabel
                control={checkbox}
                key={option.value}
                label={option.label}
                // sx={{width: 100}}
              />
            );
          })}
      </FormGroup>
    </>
  );
};

export default CheckboxesWidget;
