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

      const { data: primarySelectedCategories } = await client.query({
        query: productCategory.get,
        variables: {
          selected_categories: 1,
          depth: 1
        },
      });

      const { data: secondarySelectedCategories } = await client.query({
        query: productCategory.get,
        variables: {
          selected_categories: 1,
          depth: 2,
        },
      });

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

      const { data: packageData } = await client.query({
        query: productShop.list,
        variables: {
          shop_ids: params?.shop,
          is_packaged: 1,
        },
      });

      const { data: wolesaleData } = await client.query({
        query: productShop.get,
        variables: {
          shop_id: params?.shop,
          has_wolesale_discount: 1,
        },
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
          primarySelectedCategories: primarySelectedCategories?.productCategory,
          secondarySelectedCategories: secondarySelectedCategories?.productCategory,
          cart: initUserData?.order_carts,
          coupons: initUserData?.category_coupons,
          packageData: packageData?.productShop?.products?.data,
          wolesaleData: wolesaleData?.productShop?.products?.data,
        },
      };
    }
    catch (error) {
      return {
        props: {
          carousel: [],
          offslider: [],
          collection: [],
          packageData: [],
          wolesaleData: [],
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

export default function ShopPage(props) {
  return <ShopScreen {...props} />
}