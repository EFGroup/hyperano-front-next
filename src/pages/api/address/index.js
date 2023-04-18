import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { address } from "apollo/requests";

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export default withIronSessionApiRoute(
  async function getData(req, res) {
    let userSession = req.session.user;
    try {
      if (userSession) {
        const { data: { userAddress: { data } } } = await client.query({
          query: address.list,
          context: {
            serviceName: "auth",
              headers: {
                authorization: `Bearer ${userSession?.token}`
            }
          }
        });
        return res.status(200).send(JSON.stringify(data));
      }
      return res.status(200).json([]);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);