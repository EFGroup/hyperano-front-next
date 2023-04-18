import React from 'react';
import axios from 'axios';
import SearchScreen from 'screens/SearchScreen';
import { withIronSessionSsr } from 'iron-session/next';

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

const baseUrl = process.env.API_SERVER_URL;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, query }) {
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

      const { data: searchData } = await axios({
        method: 'GET',
        url: baseUrl + `product/search`,
        data: {
          ...query,
          orderBy_field: query.orderby,
          category_ids: query.subcategory,
          from_sub_childs: 1,
          page: Number(query.page) || 1,
          limit: Number(query.limit) || 12,
        },
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
          query,
          coupons,
          searchData,
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

export default function AboutUsPage(props) {
  return <SearchScreen {...props} />
};