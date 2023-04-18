import React from "react";
import Typography from "@mui/material/Typography";

const DescriptionField = ({ description, id }) => {
  if (description) {
    return (
      <Typography id={id} variant="subtitle2" style={{ marginTop: "5px" }}>
        {description}
      </Typography>
    );
  }

  return null;
};

export default DescriptionField;
