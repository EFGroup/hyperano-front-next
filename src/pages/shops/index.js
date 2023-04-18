import axios from 'axios';
import ShopsScreen from 'screens/ShopsScreen';
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

export default function Shops(props) {
  return <ShopsScreen {...props} />
};