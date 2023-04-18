import React from 'react';
import axios from 'axios';
import AddressScreen from 'screens/AddressScreen';
import { withIronSessionSsr } from 'iron-session/next';

import { cookie, baseUrl } from 'utils/constants';

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    try {
    
      const { data: user } = await axios({
        url: baseUrl + `auth/user`,
        method: 'GET',
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie
        }
      });

      const {
        order_carts: cart,
        category_coupons: coupons,
        addresses,
      } = user;

      const { data: menus } = await axios({
        url: baseUrl + `menu`
      });

      return {
        props: {
          user,
          cart,
          menus,
          coupons,
          addresses,
          layout: "minimal",
        },
      };
    }
    catch (error) {
      return {
        notFound: true,
      }
    }
  },
  cookie
);

export default function AddressPage(props) {
  return <AddressScreen {...props} />
};
