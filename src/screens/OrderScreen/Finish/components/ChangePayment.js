import React, { useEffect, useState } from 'react';

import {
  Card,
  Stack,
  Avatar,
  Button,
  Dialog,
  Typography,
  CardHeader,
  DialogTitle,
  DialogContent,
  CardActionArea,
  CircularProgress,
} from '@mui/material';

import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';

import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

import { order, payment } from 'apollo/requests';
import { useLazyQuery, useMutation } from '@apollo/client';

export default function ChangePayment({orderId, shop_id, refetchInfo, goToPayment, activePayment}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { accessToken } = useSelector(state => state.user);

  const [ fetchPayments, { data, loading }] = useLazyQuery(
      payment.list,
      {
        variables: {
          shop_id
        },
        context: {
            serviceName: "auth",
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        }
      }
  );

  const [ updateOrder, { loading: updateLoading } ] = useMutation(
      order.update,
      {
        ssr: true,
        context: {
            serviceName: "auth",
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        }
      }
  );

  const handleUpdateOrder = async (ids, payment_type_id) =>{
    try {
      console.log(payment_type_id)
      const result = await updateOrder({
        variables: { ids, payment_type_id }
      })
      if (result.data) {
        toast.success(String(result.data.updateOrder.messages[0]))
        refetchInfo()
        payment_type_id === "2" && goToPayment()
      }
      handleClose()
    } catch (error) {
      // toast.error(String(error.message))
    }
  }

  const res = data ? data.paymentType : []

  useEffect( ()=>{
    open && fetchPayments()
  },[open])

  return (
    <>
      <Button
        size="large"
        color="primary"
        sx={{minWidth: 180, bgcolor: 'info.lighter', color: 'info.dark', borderRadius: 2, flex: 1}}
        onClick={handleClickOpen}>
        {updateLoading ? <CircularProgress size={28} /> : "تغییر نحوه پرداخت"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir='rtl'
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          نحوه پرداخت را انتخاب کنید
        </DialogTitle>
        <DialogContent>
          <Stack justifyContent="center" alignItems="center" minHeight={300}>
                {
                loading
                ?
                <Stack justifyContent="center" alignItems="center" minHeight={300} >
                    <Typography color="GrayText">
                      در حال دریافت...
                    </Typography>
                </Stack>
                :
                <>
                    {
                    res && res.length > 0
                    ?
                        res.map( item => {
                        return <Card elevation={4} key={item.id} sx={{ m: 2, width: '100%', bgcolor: activePayment === item.id && 'success.lighter' }}>
                            <CardActionArea disabled={activePayment === item.id} onClick={()=>handleUpdateOrder(orderId, item.id)}>
                            <CardHeader
                            title={
                                <Typography align="center" variant="subtitle1">{item.title}</Typography>
                            }
                            avatar={
                                <Avatar alt="main">
                                <AttachMoneyRoundedIcon />
                                </Avatar>
                            }
                            />
                            </CardActionArea>
                        </Card>
                        })
                    :
                        <Stack justifyContent="center" alignItems="center" minHeight={300} >
                          <Typography color="GrayText">موردی یافت نشد.</Typography>
                        </Stack>
                    }
                </>
                }
            </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
