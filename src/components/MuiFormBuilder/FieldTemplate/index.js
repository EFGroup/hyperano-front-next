import React from "react";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { getTemplate, getUiOptions } from "@rjsf/utils";

const FieldTemplate = ({
  id,
  children,
  classNames,
  disabled,
  displayLabel,
  hidden,
  label,
  onDropPropertyClick,
  onKeyChange,
  readonly,
  required,
  rawErrors = [],
  errors,
  help,
  rawDescription,
  schema,
  uiSchema,
  registry,
}) => {
  const uiOptions = getUiOptions(uiSchema);
  const WrapIfAdditionalTemplate = getTemplate(
    "WrapIfAdditionalTemplate",
    registry,
    uiOptions
  );

  const { xs=12, sm=12, md=6, lg=4, xl=3 } = uiOptions;

  if (hidden) {
    return <div style={{ display: "none" }}>{children}</div>;
  }
  return (
    <Grid item p={0.5} xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
    <WrapIfAdditionalTemplate
      classNames={classNames}
      disabled={disabled}
      id={id}
      label={label}
      onDropPropertyClick={onDropPropertyClick}
      onKeyChange={onKeyChange}
      readonly={readonly}
      required={required}
      schema={schema}
      uiSchema={uiSchema}
      registry={registry}
    >
      <FormControl
        fullWidth={true}
        error={rawErrors.length ? true : false}
        required={required}
      >
        {children}
        {displayLabel && rawDescription ? (
          <Typography variant="caption" color="textSecondary">
            {rawDescription}
          </Typography>
        ) : null}
        {errors}
        {help}
      </FormControl>
    </WrapIfAdditionalTemplate>
    </Grid>
  );
};

export default FieldTemplate;
