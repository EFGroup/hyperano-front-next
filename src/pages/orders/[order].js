import OrderScreen from 'screens/OrderScreen';
import { withIronSessionSsr } from 'iron-session/next';

import client from "apollo/apollo-client";
import { user, cart, order, productCategory } from 'apollo/requests';

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, params }) {
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
      let orderData = [];

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
        const { data: orders } = await client.query({
          query: order.get,
          variables: {
            ids: params?.order
          },
          context: {
            serviceName: "auth",
              headers: {
                authorization: `Bearer ${userSession?.token}`
            }
          }
        });
        orderData = orders?.order?.data[0];
      }
      else {
        const {data: orderCart} = await client.query({
          query: cart.orderCart,
        });
        initUserData = {...initUserData, order_carts: orderCart?.orderCart};
      }

      const {data: menus} = await client.query({ query: productCategory.get });

      return {
        props: {
          isLanding: false,
          layout: "minimal",
          order: orderData,
          user: initUserData,
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
          order: {},
          coupons: [],
          isLanding: false,
          layout: "minimal",
        }
      }
    }
  },
  cookie
);

export default function IndexPage(props) {
  return <OrderScreen {...props} />
}