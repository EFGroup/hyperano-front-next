import SearchScreen from 'screens/SearchScreen';
import { withIronSessionSsr } from 'iron-session/next';

import client from "apollo/apollo-client";
import { user, cart, productCategory, productShop } from 'apollo/requests';

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, query }) {
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

      const {data: menus} = await client.query({ query: productCategory.get });
      
      const {data: searchData} = await client.query({
        query: productShop.list,
        variables: {
          ...query,
          orderBy_field: query.orderby,
          category_ids: query.subcategory,
          from_sub_childs: 1,
          page: Number(query.page) || 1,
          limit: Number(query.limit) || 12,
        }
      });

      return {
        props: {
          query,
          isLanding: false,
          layout: "minimal",
          user: initUserData,
          menus: menus?.productCategory,
          cart: initUserData?.order_carts,
          coupons: initUserData?.category_coupons,
          searchData: searchData?.productShop?.products?.data,
        }
      }
    }
    catch (error) {
      return {
        props: {
          query,
          user: {},
          cart: {},
          menus: [],
          coupons: [],
          searchData: [],
          isLanding: false,
          layout: "minimal",
        }
      }
    }
  },
  cookie
);

export default function IndexPage(props) {
  return <SearchScreen {...props} />
}