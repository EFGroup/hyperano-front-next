import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { getSubmitButtonOptions } from "@rjsf/utils";

const SubmitButton = (props) => {
  const {
    submitText,
    norender,
    props: submitButtonProps,
  } = getSubmitButtonOptions(props.uiSchema);
  if (norender) {
    return null;
  }
  return (
    <Box marginTop={3}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        {...submitButtonProps}
      >
        {submitText}
      </Button>
    </Box>
  );
};

export default SubmitButton;
