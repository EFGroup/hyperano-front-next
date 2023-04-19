import React from 'react';
import axios from 'axios';
import ShopScreen from 'screens/ShopScreen';
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
      } = user;
      
      const { data: menus } = await axios({
        url: baseUrl + `menu`
      });

      const { data: carousel } = await axios({
        url: baseUrl + `carousel/?shop=${params.shop}&category=1`
      });

      const { data: offslider } = await axios({
        url: baseUrl + `product/?shop=${params.shop}`
      });

      const { data: collection } = await axios({
        url: baseUrl + `product/collection/?shop=${params.shop}`
      });

      return {
        props: {
          user,
          cart,
          menus,
          coupons,
          carousel,
          offslider,
          collection,
          isLanding: true,
          layout: "minimal",
          title: 'userOrderCart',
          // selectedCategories: JSON.parse(selectedCategories.productCategory),
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

export default function ShopPage(props) {
  return <ShopScreen {...props} />
};