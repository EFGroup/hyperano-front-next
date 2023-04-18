import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { productCategory } from "apollo/requests";

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export default withIronSessionApiRoute(
  async function getData(req, res) {
    const {
      body,
      query,
      method,
      session: { user: userSession },
    } = req;
    switch (method) {
      case 'GET':
        try {
          const {data} = await client.query({
            query: productCategory.get,
            variables: {
              ...query,
              // shop_ids: userSession?.shop,
            }
          });
          // const menus = JSON.stringify(JSON.parse(data.productCategory))
          // return res.status(200).send(menus);
          return res.status(200).json(JSON.parse(data.productCategory));
        } catch (error) {
          return res.status(400).json(error);
        }

      default:
        res.setHeader('Allow', ['GET'])
        // res.setDefaultEncoding('utf-8')
        // res.set({ 'content-type': 'text/html; charset=utf-8' })
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  },
  cookie
);