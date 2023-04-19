import React from 'react';
import axios from 'axios';
import OrderScreen from 'screens/OrderScreen';
import { withIronSessionSsr } from 'iron-session/next';

// import { cookie, baseUrl } from 'utils/constants';
const baseUrl = process.env.API_SERVER_URL;

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, params }) {
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

      const { data: order } = await axios({
        url: baseUrl + `order/${params?.order}`,
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie
        }
      });

      return {
        props: {
          user,
          cart,
          menus,
          order,
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

export default function OrderPage(props) {
  return <OrderScreen {...props} />
};
