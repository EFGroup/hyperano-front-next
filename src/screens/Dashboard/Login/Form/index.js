import React from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import { user } from 'apollo/requests';
import { useMutation } from '@apollo/client';

import MuiFormBuilder from 'components/MuiFormBuilder';
import uiSchema from './uiSchema';
import schema from './schema';

import nextApiApolloErrHandling from 'utils/nextApiApolloErrHandling';

import { useDispatch } from 'react-redux';
import { setUser, setCoupons, setInitCart, setShop } from 'redux/actions';

const Form = ({ initData }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const formData = location.state ? { ...initData } : {};
  
  const [login, { loading }] = useMutation(user.login);

  const handleSubmit = async({ formData }) =>{
    try {
      const {data: { login: { user: userData } }, errors} = await login({
        variables: formData,
      })
      if (!errors) {
        dispatch(setUser(userData))
        dispatch(setCoupons(userData?.category_coupons || []))
        if (userData?.order_carts) {
          dispatch(setInitCart(userData?.order_carts))
          dispatch(setShop(userData?.order_carts[0]?.shop))
        }
        toast.success("ورود با موفقیت انجام شد")
      }
    } catch (error) {
      nextApiApolloErrHandling(error);
    }
  }

  return (
    <>
    {/* <LogReports /> */}
    <MuiFormBuilder
      schema={schema()}
      uiSchema={uiSchema()}
      formData={formData}
      onSubmit={handleSubmit}
      loading={loading}
      submit="ورود"
    />
    {/* <div>
      {isOnline ? <strong className="text-success">#online</strong> : <strong className="text-danger">#offline</strong>} -&nbsp;
      {!queue.length ? 'Queue is empty' : <h3><strong>{queue.length}</strong> element(s) in queue</h3>}
      {!queue.length ? 'appQueue is empty' : <h3><strong>{appQueue.length}</strong> element(s) in appQueue</h3>}
    </div>
    <Stack>
      {
        log.map( item => (
          <Stack key={item.id} direction="row" justifyContent="space-between" alignItems="center">
            <Typography>{item.name}</Typography>
            <Typography>{item.url}</Typography>
            <Typography>{item.errors}</Typography>
            <Button onClick={eval(item.callback)}>retry</Button>
            <Button onClick={()=> dispatch(removeLog(item))}>ignore</Button>
          </Stack>
        ))
      }
    </Stack> */}
    </>
  );
};

export default Form;
