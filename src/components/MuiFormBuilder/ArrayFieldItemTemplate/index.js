import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const ArrayFieldItemTemplate = (props) => {
  const {
    children,
    disabled,
    hasToolbar,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    index,
    onDropIndexClick,
    onReorderClick,
    readonly,
    uiSchema,
    registry,
  } = props;
  const { MoveDownButton, MoveUpButton, RemoveButton } =
    registry.templates.ButtonTemplates;
  const btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold",
    minWidth: 0,
  };
  return (
    <Grid container={true} alignItems="center">
      <Grid item={true} xs style={{ overflow: "auto" }}>
        {children}
      </Grid>
      {hasToolbar && (
        <Grid item={true}>
          <Grid container={true} direction="column">
            {(hasMoveUp || hasMoveDown) && (
              <MoveUpButton
                style={btnStyle}
                disabled={disabled || readonly || !hasMoveUp}
                onClick={onReorderClick(index, index - 1)}
                uiSchema={uiSchema}
              />
            )}
            {(hasMoveUp || hasMoveDown) && (
              <MoveDownButton
                style={btnStyle}
                disabled={disabled || readonly || !hasMoveDown}
                onClick={onReorderClick(index, index + 1)}
                uiSchema={uiSchema}
              />
            )}
            {hasRemove && (
              <RemoveButton
                style={btnStyle}
                disabled={disabled || readonly}
                onClick={onDropIndexClick(index)}
                uiSchema={uiSchema}
              />
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ArrayFieldItemTemplate;
