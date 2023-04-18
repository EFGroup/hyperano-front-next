import React from 'react';
import axios from 'axios';
import OrdersScreen from 'screens/OrdersScreen';
import { withIronSessionSsr } from 'iron-session/next';

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

const baseUrl = process.env.API_SERVER_URL;

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
      } = user;

      const { data: orders } = await axios({
        url: baseUrl + `order`,
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie
        }
      });

      const { data: menus } = await axios({
        url: baseUrl + `menu`
      });

      return {
        props: {
          user,
          cart,
          menus,
          coupons,
          orders,
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

export default function OrdersPage(props) {
  return <OrdersScreen {...props} />
}