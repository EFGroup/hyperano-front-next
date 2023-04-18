import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

const AddButton = ({
  uiSchema,
  ...props
}) => {
  return (
    <Button variant="outlined" title="Add Item" {...props} color="primary">
      <AddIcon />
    </Button>
  );
};

export default AddButton;
