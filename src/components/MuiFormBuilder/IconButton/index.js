import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import RemoveIcon from "@mui/icons-material/Remove";

export default function MuiIconButton(props) {
  const { icon, color, uiSchema, ...otherProps } = props;
  return (
    <IconButton
      {...otherProps}
      size="small"
      color={color}
    >
      {icon}
    </IconButton>
  );
}

export function MoveDownButton(props) {
  return (
    <MuiIconButton
      title="Move down"
      {...props}
      icon={<ArrowDownwardIcon fontSize="small" />}
    />
  );
}

export function MoveUpButton(props) {
  return (
    <MuiIconButton
      title="Move up"
      {...props}
      icon={<ArrowUpwardIcon fontSize="small" />}
    />
  );
}

export function RemoveButton(props) {
  const { iconType, ...otherProps } = props;
  return (
    <MuiIconButton
      title="Remove"
      {...otherProps}
      color="error"
      icon={
        <RemoveIcon fontSize={iconType === "default" ? undefined : "small"} />
      }
    />
  );
}
