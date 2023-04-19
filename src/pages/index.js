import React from 'react';
import axios from 'axios';
import IndexScreen from 'screens/IndexScreen';
import { withIronSessionSsr } from 'iron-session/next';

// // import { cookie, baseUrl } from 'utils/constants';
const baseUrl = process.env.API_SERVER_URL;

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

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

      const { data: menus } = await axios({
        url: baseUrl + `menu`
      });

      const { data: shops } = await axios({
        method: 'GET',
        url: baseUrl + `shop`
      });

      return {
        props: {
          user,
          cart,
          menus,
          shops,
          coupons,
          isLanding: true,
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

export default function IndexPage(props) {
  return <IndexScreen {...props} />
  // return <h6>index</h6>
}