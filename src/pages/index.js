import IndexScreen from 'screens/IndexScreen';
import { withIronSessionSsr } from 'iron-session/next';

import client from "apollo/apollo-client";
import { user, cart, shop, productCategory } from 'apollo/requests';

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    try {

      const userSession = req.session?.user;
      
      let initUserData = {
        orders: null,
        wallet: null,
        discounts: null,
        addresses: null,
        order_carts: null,
        category_coupons: null,
      }

      if (userSession) {
        const { data } = await client.query({
          query: user.get,
          context: {
            serviceName: "auth",
              headers: {
                authorization: `Bearer ${userSession?.token}`
            }
          }
        });
        initUserData = data?.user;
      }
      else {
        const {data: orderCart} = await client.query({
          query: cart.orderCart,
        });
        initUserData = {...initUserData, order_carts: orderCart?.orderCart};
      }

      const { data: shops } = await client.query({ query: shop.list });

      const {data: menus} = await client.query({
        query: productCategory.get,
        // variables: {
        //   shop_id: shop || undefined
        // }
      });

      return {
        props: {
          isLanding: true,
          layout: "minimal",
          user: initUserData,
          shops: shops?.shop?.data,
          menus: menus?.productCategory,
          cart: initUserData?.order_carts,
          coupons: initUserData?.category_coupons,
        }
      }
    }
    catch (error) {
      return {
        props: {
          user: {},
          cart: {},
          menus: [],
          shops: [],
          coupons: [],
          isLanding: true,
          layout: "minimal",
        }
      }
    }
  },
  cookie
);

export default function IndexPage(props) {
  return <IndexScreen {...props} />
}