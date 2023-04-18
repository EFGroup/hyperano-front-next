import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import MuiFormBuilder from "./MuiFormBuilder";
import validator from "@rjsf/validator-ajv6";
import { removeNulls } from "./utils";

const MuiForm = ({
  formData,
  onSubmit,
  onChange,
  schema,
  uiSchema = {},
  submit = 'ذخیره',
  loading = false,
  liveValidate = true,
  showErrorList = false,
  disabled = false
}) => {
  return (
    <MuiFormBuilder
    noHtml5Validate
    schema={schema}
    uiSchema={uiSchema}
    onChange={onChange}
    onSubmit={onSubmit}
    validator={validator}
    liveValidate={liveValidate}
    showErrorList={showErrorList}
    formData={removeNulls(formData)}
    >
      <Stack px={2} py={2} justifyContent="center" alignItems="center">
        <Button
          disabled={loading || disabled}
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          sx={{minWidth: 250, px: 12, py: 4, alignSelf: 'center'}}>
            {loading
            ? <CircularProgress size={24} color="secondary" />
            : submit}
        </Button>
      </Stack>
    </MuiFormBuilder>
  );
};

export default MuiForm;
