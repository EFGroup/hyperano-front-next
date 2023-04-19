import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { address } from "apollo/requests";

// import { cookie, baseUrl } from 'utils/constants';
const baseUrl = process.env.API_SERVER_URL;

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export default withIronSessionApiRoute(
  async function getData(req, res) {
    const { address: ids } = req.query;
    try {
      let userSession = req.session.user;
      const { data: { userAddress: { data } } } = await client.query({
        query: address.get,
        context: {
          serviceName: "auth",
            headers: {
              authorization: `Bearer ${userSession?.token}`
          }
        },
        variables: {
          ids
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);
