import React from "react";
import FormHelperText from "@mui/material/FormHelperText";

/** The `FieldHelpTemplate` component renders any help desired for a field
 *
 * @param props - The `FieldHelpProps` to be rendered
 */
export default function FieldHelpTemplate(props) {
  const { idSchema, help } = props;
  if (!help) {
    return null;
  }
  const id = `${idSchema.$id}__help`;
  return <FormHelperText id={id}>{help}</FormHelperText>;
}
