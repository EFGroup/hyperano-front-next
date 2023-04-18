import React from "react";
import { getTemplate } from "@rjsf/utils";

const TextareaWidget = (props) => {
  const { options, registry } = props;
  const BaseInputTemplate = getTemplate(
    "BaseInputTemplate",
    registry,
    options
  );

  let rows = 5;
  if (typeof options.rows === "string" || typeof options.rows === "number") {
    rows = options.rows;
  }

  return <BaseInputTemplate {...props} multiline rows={rows} />;
};

export default TextareaWidget;
