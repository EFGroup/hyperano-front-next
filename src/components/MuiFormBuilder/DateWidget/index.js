import React from "react";
import { getTemplate } from "@rjsf/utils";

const DateWidget = (props) => {
  const { options, registry } = props;
  const BaseInputTemplate = getTemplate(
    "BaseInputTemplate",
    registry,
    options
  );
  return (
    <BaseInputTemplate
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
    />
  );
};

export default DateWidget;
