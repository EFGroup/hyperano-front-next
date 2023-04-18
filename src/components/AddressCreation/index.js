import React, { useState, useEffect, useRef, lazy } from 'react';

import {
    Grid,
    Dialog,
    Button,
    styled,
    TextField,
    IconButton,
    DialogContent,
} from '@mui/material';

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import MyLocationRoundedIcon from '@mui/icons-material/MyLocationRounded';

import { address } from "apollo/requests";
import { useMutation } from '@apollo/client';

import validate from 'validate.js';
import { toast } from 'react-toastify';
import { useSelector} from "react-redux";

// import { Loadable } from 'components';
import dynamic from "next/dynamic";
import Skeleton from '@mui/material/Skeleton';

import SearchAddress from './SearchAddress';

const MyDialogContent = styled(DialogContent)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  backgroundColor: 'hsla(0,0%,100%,.95)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: theme.spacing(10, 6),
  direction: 'rtl'
}));

const schema = {
    title: {
      presence: { allowEmpty: false, message: 'وارد کردن این فیلد الزامی است' },
      length: { maximum: 64 }
    },
    tellphone: {
      length: { maximum: 11 }
    },
    main_street: {
      length: { maximum: 128 }
    },
    minor_address: {
      length: { maximum: 128 }
    },
    postal_code: {
      length: { maximum: 10 }
    },
};

// const DynamicComponentWithNoSSR = Loadable(lazy(() => import('components/Mapir')));
const DynamicComponentWithNoSSR = dynamic(
  () =>  import('components/Mapir'),
  {
    ssr: false,
    loading: 
      () => <Skeleton
              width="100%"
              height="30vh"
              variant="rectangular"
              animation= "wave"
              sx={{
                backgroundImage: 'url("/logo.svg")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                borderRadius: 2
              }}
            />
  }
);

export default function NewAddress({icon = false, refetch, addr}) {
  const [open, setOpen] = useState(false);
  const { accessToken } = useSelector(state => state.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [ handleAddress ] = useMutation(
      address.create,
      {
        context: {
            serviceName: "auth",
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        }
      }
  );

  const [ updateAddress ] = useMutation(
      address.update,
      {
        context: {
            serviceName: "auth",
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        }
      }
  );

  const [location, setLocation] = useState({ lat: addr?.lat || 32.696533, lng: addr?.lng || 51.721715 })
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      // ...addr
      ids: addr?.id || undefined,
      title: addr?.title || undefined,
      tellphone: addr?.tellphone || undefined,
      main_street: addr?.main_street || undefined,
      minor_address: addr?.minor_address || undefined,
      postal_code: addr?.postal_code || undefined
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : (event.target.value)
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (addr) {
      const {data} = await updateAddress({
        variables: {
          ...formState.values,
          lat: location.lat ? String(location.lat) : undefined,
          lng: location.lng ? String(location.lng) : undefined,
        }
      })
      if(data){
        toast.success(String(data.updateUserAddress.messages[0]))
      }
    } else {
      const {data} = await handleAddress({
        variables: {
          ...formState.values,
          lat: String(location.lat),
          lng: String(location.lng),
        }
      })
      if(data){
        toast.success(String(data.createUserAddress.messages[0]))
      }
    }
    refetch()
    handleClose()
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const setTextAddres = (address) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        main_street: address
      },
      touched: {
        ...formState.touched,
        main_street: true
      }
    }));
  }

  const setLatLng = (location) => {
    setLocation(location)
  }

  const [center, setCenter] = useState([addr?.lng || 51.721715, addr?.lat || 32.696533]);
  const changeCenter = (data) => {
    setCenter(data)
  }

  return (
    <>
      {
        icon
        ?
          <IconButton sx={{bgcolor: 'info.lighter'}} size="small" onClick={handleClickOpen}>
            <MyLocationRoundedIcon color='info' fontSize='small' />
          </IconButton>
        :
          <Button
            variant="contained" size="small" color="primary"
            sx={{borderRadius: 2}}
            onClick={handleClickOpen}>
            آدرس جدید
          </Button>
      }
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <MyDialogContent>
          <IconButton style={{ alignSelf: 'flex-end' }} onClick={handleClose}>
            <CancelRoundedIcon fontSize="small" />
          </IconButton>

          <SearchAddress changeCenter={changeCenter} />
          <DynamicComponentWithNoSSR
            getTextAddres={setTextAddres}
            getLocation={setLatLng}
            center={center}
          />

          <form onSubmit={handleSignIn} style={{width: "100%"}}>
            <Grid container spacing={0} width="100%">
              <Grid item xs={12} md={6} pl={1} pr={1} pt={1} pb={1}>
                <TextField
                  error={hasError('title')}
                  fullWidth
                  helperText={
                    hasError('title') ? formState.errors.title[0] : null
                  }
                  label="عنوان آدرس"
                  name="title"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.title || ''}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} md={6} pl={1} pr={1} pt={1} pb={1}>
                <TextField
                  error={hasError('tellphone')}
                  fullWidth
                  helperText={
                    hasError('tellphone') ? formState.errors.tellphone[0] : null
                  }
                  label="تلفن همراه تحویل گیرنده"
                  name="tellphone"
                  onChange={handleChange}
                  type="tel"
                  value={formState.values.tellphone || ''}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} md={12} pl={1} pr={1} pt={1} pb={1}>
                <TextField
                  error={hasError('main_street')}
                  fullWidth
                  helperText={
                    hasError('main_street') ? formState.errors.main_street[0] : null
                  }
                  label="آدرس"
                  name="main_street"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.main_street || ''}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} md={6} pl={1} pr={1} pt={1} pb={1}>
                <TextField
                  error={hasError('minor_address')}
                  fullWidth
                  helperText={
                    hasError('minor_address') ? formState.errors.minor_address[0] : null
                  }
                  label="جزئیات آدرس"
                  name="minor_address"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.minor_address || ''}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} md={6} pl={1} pr={1} pt={1} pb={1}>
                <TextField
                  error={hasError('postal_code')}
                  fullWidth
                  helperText={
                    hasError('postal_code') ? formState.errors.postal_code[0] : null
                  }
                  label="کد پستی"
                  name="postal_code"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.postal_code || ''}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} md={12} pl={1} pr={1} pt={1} pb={1}>
                <Button
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    p: 2,
                    borderRadius: 2
                  }}
                >
                  ثبت آدرس
                </Button>
              </Grid>
            </Grid>
          </form>

        </MyDialogContent>
      </Dialog>
    </>
  );
}
