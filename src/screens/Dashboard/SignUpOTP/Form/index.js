import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormBuilder from 'components/FormBuilder';

import api from 'services/RestAPI';
import { useDispatch } from 'react-redux';
import { notification, errHandling } from 'redux/actions';
import uiSchema from './uiSchema';
import schema from './schema';

const Form = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('messages');
  const validate = (formData, errors) => errors;

  const formData = data || {};

  const onSubmit = async ({ formData }) => {
    try {
      const result = await api.user.sendOTP(formData);
      if (!result.error) {
        dispatch(
          notification({
            message: t('send_otp_success'),
            variant: 'success'
          })
        );
        navigate('/register', { state: formData });
      }
    } catch (error) {
      dispatch(errHandling(error));
    }
  };

  return (
    <FormBuilder
      schema={schema()}
      uiSchema={uiSchema()}
      validate={validate}
      formData={formData}
      onSubmit={onSubmit}
    />
  );
};

export default Form;
