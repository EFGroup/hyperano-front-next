import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const TitleField = ({ id, title }) => {
  return (
    <Box id={id} mb={1} mt={1}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Divider />
    </Box>
  );
};

export default TitleField;
