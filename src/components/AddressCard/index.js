import React from 'react';

import {
  Chip,
  Card,
  Stack,
  Avatar,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  CircularProgress,
} from '@mui/material';

import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';

import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

import { address } from "apollo/requests";
import { useMutation } from '@apollo/client';

import { AddressCreation } from 'components';

export default function AddressCard({addr, refetch}) {
  const { accessToken } = useSelector(state => state.user);

  const [ deleteUserAddress, { loading: deleteLoading } ] = useMutation(
    address.delete,
    {
      context: {
        serviceName: "auth",
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      }
    }
  );

  const deleteAddr = async(ids) => {
    try {
      const { data } = await deleteUserAddress({
        variables: { ids }
      })
      if(data) {
        toast.success(String(data.deleteUserAddress.messages[0]))
      }
      refetch()
    } catch (error) {
      console.log("delete")
    }
  }

  return (
    <Card elevation={2}>
      <CardHeader
        title={addr.title}
        avatar={
          <Avatar sx={{bgcolor: 'warning.lighter'}}>
            <MapsHomeWorkRoundedIcon color='warning' fontSize="small" />
          </Avatar>
        }
        action={
          <Stack direction="row" columnGap={1}>
            <AddressCreation refetch={refetch} addr={addr} icon />
            <IconButton
              size="small"
              disabled={deleteLoading}
              sx={{bgcolor: 'error.lighter'}}
              onClick={() => deleteAddr(addr.id)}>
                {
                  deleteLoading ? <CircularProgress size={20} /> : <DeleteOutlineRoundedIcon color="error" fontSize='small' />
                }
            </IconButton>
          </Stack>
        }
      />
      <CardContent sx={{display: 'flex', flexDirection: 'column', rowGap: 1, py: 0}}>
        <Stack direction={{xs: 'column', sm: 'row', md: 'row'}} justifyContent="space-between">
          <Stack rowGap={1}>
            <Typography variant="subtitle2">
              {`${addr?.main_street || ""} ${addr?.minor_address || ""}`}
            </Typography>
          </Stack>
          <Stack rowGap={1}>
            <Chip label={`کد پستی: ${addr.postal_code || "ثبت نشده"}`} />
            <Chip label={`تلفن تماس: ${addr.tellphone || "ثبت نشده"}`} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}