import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  getTemplate,
  getUiOptions,
} from "@rjsf/utils";

const ArrayFieldTemplate = (props) => {
  const {
    canAdd,
    disabled,
    idSchema,
    uiSchema,
    items,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
  } = props;
  const uiOptions = getUiOptions(uiSchema);
  const ArrayFieldDescriptionTemplate =
    getTemplate(
      "ArrayFieldDescriptionTemplate",
      registry,
      uiOptions
    );
  const ArrayFieldItemTemplate = getTemplate(
    "ArrayFieldItemTemplate",
    registry,
    uiOptions
  );
  const ArrayFieldTitleTemplate = getTemplate(
    "ArrayFieldTitleTemplate",
    registry,
    uiOptions
  );
  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;
  return (
    <Paper elevation={2}>
      <Box p={2}>
        <ArrayFieldTitleTemplate
          idSchema={idSchema}
          title={uiOptions.title || title}
          schema={schema}
          uiSchema={uiSchema}
          required={required}
          registry={registry}
        />
        <ArrayFieldDescriptionTemplate
          idSchema={idSchema}
          description={uiOptions.description || schema.description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
        <Grid container={true} key={`array-item-list-${idSchema.$id}`}>
          {items &&
            items.map(({ key, ...itemProps }) => (
              <ArrayFieldItemTemplate key={key} {...itemProps} />
            ))}
          {canAdd && (
            <Grid container justifyContent="flex-end">
              <Grid item={true}>
                <Box mt={2}>
                  <AddButton
                    className="array-item-add"
                    onClick={onAddClick}
                    disabled={disabled || readonly}
                    uiSchema={uiSchema}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};

export default ArrayFieldTemplate;
