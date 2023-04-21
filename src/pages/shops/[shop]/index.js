import ShopScreen from 'screens/ShopScreen';
import { withIronSessionSsr } from 'iron-session/next';

import client from "apollo/apollo-client";
import { user, cart, productCategory, carousel, productShop } from 'apollo/requests';

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

      const { data: menus } = await client.query({ query: productCategory.get });

      const { data: carouselData } = await client.query({
        query: carousel.get,
        variables: {
          shop_id: params?.shop,
          depth: 1,
          limit: 10
        }
      });

      const { data: offsliderData } = await client.query({
        query: productShop.get,
        variables: {
          shop_ids: params?.shop,
          orderBy_field: "discount_percent",
          limit: 5
        }
      });

      const { data: collectionData } = await client.query({
        query: productShop.productCollectedCategory,
        variables: {
          shop_id: params?.shop
        }
      });

      return {
        props: {
          carousel: carouselData?.carousel,
          offslider: offsliderData?.productShop?.products?.data,
          collection: collectionData?.productCollectedCategory?.data,
          isLanding: false,
          layout: "minimal",
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
          carousel: [],
          offslider: [],
          collection: [],
          user: {},
          cart: {},
          menus: [],
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
  return <ShopScreen {...props} />
}