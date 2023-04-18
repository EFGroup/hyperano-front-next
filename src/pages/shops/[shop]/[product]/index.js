import React from 'react';
import axios from 'axios';
import ProductScreen from 'screens/ProductScreen';
import { withIronSessionSsr } from 'iron-session/next';

import { cookie, baseUrl } from 'utils/constants';

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
      } = user;

      const { data: menus } = await axios({
        url: baseUrl + `menu`
      });

      const { data: product } = await axios({
        url: baseUrl + `product/${params.product}/?shop=${params.shop}`
      });

      return {
        props: {
          user,
          cart,
          menus,
          coupons,
          product,
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

export default function ProductPage(props) {
  return <ProductScreen {...props} />
};
