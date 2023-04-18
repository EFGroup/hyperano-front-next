import React, { useState, useEffect  } from 'react';

import validate from 'validate.js';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';

import CloseIcon from '@mui/icons-material/Close';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Image from 'next/image';

const schema = {
    description: {
        length: {
            maximum: 200
        }
    },
};

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function DetailsPopup({confirm, loading}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
 
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
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


  const handleSignUp = async (event) =>{
    event.preventDefault();
    confirm({...formState.values, call_me: formState.values?.call_me ? 1 : 0})
    handleClose()
  }

  const hasError = field =>
  formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <>
        <Button
            color="secondary"
            size="large"
            sx={{ bgcolor: green[50], color: green[800], borderRadius: 2, minWidth: 180, flex: 2}}
            onClick={handleClickOpen}
            endIcon={<CheckRoundedIcon fontSize="small" />}
            fullWidth disableRipple>
            تایید نهایی فاکتور
        </Button>
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            dir="rtl"
            PaperProps={{
                sx: {
                    overflow: 'visible',
                    borderRadius: 2
                }
            }}
            maxWidth="sm"
            fullWidth
        >
            <BootstrapDialogTitle
                style={{
                    position: 'relative',
                    overflow: 'visible',
                    paddingTop: 48
                }}
                id="customized-dialog-title"
                onClose={handleClose}
            >
              <Stack sx={{
                  position: 'absolute',
                  top: -96,
                  left: -40,
                  transition: 'all 1s ease',
              }}>
                  <Image
                  alt="user-profile" src={'/images/call.webp'}
                  style={{objectFit: 'contain'}} height={200} width={200} />
              </Stack>
            </BootstrapDialogTitle>
            <DialogContent>
                <Stack p={1} rowGap={3} >
                <form onSubmit={event=>handleSignUp(event)}>
                    <Stack rowGap={1} columnGap={1} sx={{direction: 'rtl'}} pl={0.5} pr={0.5}>
                    <TextField
                        error={hasError('description')}
                        fullWidth
                        helperText={
                            hasError('description') ? formState.errors.description[0] : null
                        }
                        label="توضیحات من"
                        name="description"
                        onChange={handleChange}
                        type="text"
                        multiline
                        minRows={7}
                        value={formState.values.description || ''}
                        variant="outlined"
                        margin="dense"
                    />
                    <Stack columnGap={2} rowGap={1} direction={ { xs: "column", md: "row" }} alignItems="center" justifyContent="space-between">
                      <Stack flex={1} columnGap={2}
                        direction="row" alignItems="center"
                        justifyContent="space-evenly"
                        sx={{
                          bgcolor: green[50],
                          borderRadius: 2,
                          padding: 1
                        }}
                      >
                        <Typography align="right" variant="subtitle1">با من تماس بگیرید</Typography>
                        <Checkbox
                          checked={formState.values.call_me || false}
                          color="secondary"
                          name="call_me"
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                          onChange={handleChange}
                        />
                      </Stack>
                      <Button
                          color="secondary"
                          disabled={!formState.isValid}
                          size="large"
                          type="confirm"
                          variant="contained"
                          sx={{
                              borderRadius: 2,
                              minWidth: 200,
                              height: 64,
                              flex: 1
                          }}
                      >
                          { loading ? <CircularProgress color="inherit" size={26} /> : <Typography variant="subtitle1" fontSize={20}>تایید نهایی فاکتور</Typography> }
                      </Button>
                    </Stack>
                    </Stack>
                </form>
                </Stack>
            </DialogContent>
        </Dialog>
    </>
  );
}