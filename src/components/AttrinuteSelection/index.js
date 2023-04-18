import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { blue, orange, yellow } from '@mui/material/colors';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import AddToCartBtn from '../AddToCartBtn';
import { currency } from 'helpers/persianTools';

const AttributeSelection = (props)=> {
  const [open, setOpen] = React.useState(false);
  const {
    id,
    shop,
    title = "افزودن به سبد",
    attributes,
    current = []
  }  = props;

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
  });

  useEffect(() => {
    const isValid = attributes ? Object.values(formState.values).length === attributes.length : false ;
    setFormState(formState => ({
      ...formState,
      isValid,
    }));
  }, [formState.values]);

  const handleChange = event => {
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

  const same = current.find( item =>
    JSON.stringify(Object.values(formState.values).filter( item => item !== "null" )) === JSON.stringify(item?.attr)
  )

  // const currentExist = current[0]?.id === id;

  return (
    <>
        <Button
          color="error"
          fullWidth
          onClick={handleClickOpen}
          endIcon={<AddCircleOutlineRoundedIcon />}
          sx={{
              maxHeight: 48,
              fontWeight: "bold",
              borderRadius: 2,
              flex: 1,
              color: orange[800],
              bgcolor: yellow[50],
              transition: 'all 0.3s ease',
              '&:hover': {
                  flex: 3,
                  opacity: 1,
                  bgcolor: orange[400],
                  color: "#fff",
                  fontSize: 15,
                  transition: 'all 0.3s ease',
                  boxShadow: `0 10px 16px -4px ${orange[50]}`
              }
          }}
        >
          {title}
        </Button>
        <Dialog maxWidth='xs' onClose={handleClose} aria-labelledby="sign-dialog-title" open={open}>
            <MuiDialogTitle>
            <Typography align="left" variant="h6" component="p">انتخاب ویژگی ها</Typography>
            <IconButton aria-label="close" sx={{
                position: 'absolute',
                right: 8,
                top: 8,
            }} onClick={handleClose}>
                 <CloseIcon />
            </IconButton>
            </MuiDialogTitle>
            <MuiDialogContent dividers>
                <Stack spacing={2} sx={{direction: 'rtl', minWidth: 300}}>
                        {
                            attributes.map( (attr , i)=>(
                                <TextField
                                    key={i}
                                    id={attr?.id}
                                    fullWidth
                                    // required
                                    label={attr.title}
                                    name={attr?.id}
                                    onChange={handleChange}
                                    type="text"
                                    select
                                    value={formState.values[attr?.id] || ''}
                                    variant="outlined"
                                    margin="dense"
                                    size="small"
                                >
                                    <MenuItem selected sx={{ direction: 'rtl'}} value={"null"}>انتخاب نشده</MenuItem>
                                    {
                                        attr.values.map( val => (
                                            <MenuItem key={val.id} sx={{ direction: 'rtl'}} id={val.id} value={val.id}>{`${val.title} (${currency(val.price_change_value)})`}</MenuItem>
                                        ))
                                    }
                                    </TextField>
                            ))
                        }
                        <AddToCartBtn
                          id={id}
                          shop={shop}
                          title={title}
                          currentExist={Boolean(same)}
                          current={same || []}
                          attrVals={Object.values(formState.values).filter( item => item !== "null" )}
                          isValid={!formState.isValid}
                        />
                </Stack>
            </MuiDialogContent>
        </Dialog>
    </>
  );
}

export default AttributeSelection;