import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormBuilder from 'components/FormBuilder';

import api from 'services/RestAPI';
import { useDispatch } from 'react-redux';
import { notification, errHandling } from 'redux/actions';
import uiSchema from './uiSchema';
import schema from './schema';

const Form = ({ data }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation('messages');

  const validate = (formData, errors) => errors;

  const formData = location.state ? { ...data, phone: location.state.new_phone } : {};

  const onSubmit = async ({ formData }) => {
    try {
      const result = await api.user.register(formData);
      if (!result.error) {
        // dispatch(userSignIn(result.token.access, 'new'));
        dispatch(
          notification({
            message: t('welcomeRegister'),
            variant: 'success'
          })
        );
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
