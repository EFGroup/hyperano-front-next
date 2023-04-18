import React from 'react';
import { FormHelperText } from '@mui/material';

export const getError = (errors) => {
  if (errors) {
    return errors.map((info) => (
      <FormHelperText
        style={{ color: 'red', fontSize: 10, marginTop: -6, marginBottom: 8 }}
        key={info}
      >
        {info}
      </FormHelperText>
    ));
  }
  return null;
};

const err = {
  'should be string': 'فیلد موردنظر باید از نوع متنی باشد',
  'should match format "uri"': 'فیلد مرجع باید به صورت «http://example.com» باشد.',
  'should match format "email"': 'فیلد موردنظر باید یک ایمیل معتبر باشد.',
  'should match format "phone"': 'فیلد موردنظر باید یک شماره همراه به فرمت «091xxxxxxx» باشد.'
};

export function transformErrors(errors) {
  return errors.map((error) => {
    error.message = err[error.message];
    if (error.name === 'required') {
      error.message = 'وارد کردن این فیلد الزامی است.';
    }
    if (error.name === 'minLength') {
      error.message = `طول این فیلد حداقل باید ${error.params.limit} کاراکتر باشد.`;
    }
    if (error.name === 'maxLength') {
      error.message = `طول این فیلد حداکثر باید ${error.params.limit} کاراکتر باشد.`;
    }
    // if (error.name === 'type') {
    //   error.message = `این فیلد باید از نوع ${error.params.type} باشد.`;
    // }
    return error;
  });
}

export function removeNulls(obj) {
  if (obj === null) {
    return undefined;
  }
  if (typeof obj === 'object') {
    for (let key in obj) {
      obj[key] = removeNulls(obj[key]);
    }
  }
  return obj;
};