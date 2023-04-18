import React from "react";
import TextField from "@mui/material/TextField";
import { getInputProps } from "@rjsf/utils";

const BaseInputTemplate = ({
  id,
  placeholder,
  required,
  readonly,
  disabled,
  type,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  autofocus,
  options,
  schema,
  uiSchema,
  rawErrors = [],
  formContext,
  registry,
  ...textFieldProps
}) => {
  const inputProps = getInputProps(schema, type, options);
  // Now we need to pull out the step, min, max into an inner `inputProps` for material-ui
  const { step, min, max, ...rest } = inputProps;
  const otherProps = {
    inputProps: {
      step,
      min,
      max,
      ...(schema.examples ? { list: `examples_${id}` } : undefined),
    },
    ...rest,
  };
  const _onChange = ({
    target: { value },
  }) =>
    onChange(value === "" ? options.emptyValue : value);
  const _onBlur = ({ target: { value } }) =>
    onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }) => onFocus(id, value);

  const { schemaUtils } = registry;
  const displayLabel = schemaUtils.getDisplayLabel(schema, uiSchema);

  return (
    <>
      <TextField
        id={id}
        name={id}
        placeholder={placeholder}
        label={displayLabel ? label || schema.title : false}
        autoFocus={autofocus}
        required={required}
        disabled={disabled || readonly}
        {...otherProps}
        value={value || value === 0 ? value : ""}
        error={rawErrors.length > 0}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        {...(textFieldProps)}
      />
      {schema.examples && (
        <datalist id={`examples_${id}`}>
          {(schema.examples)
            .concat(schema.default ? ([schema.default]) : [])
            .map((example) => {
              return <option key={example} value={example} />;
            })}
        </datalist>
      )}
    </>
  );
};

export default BaseInputTemplate;
