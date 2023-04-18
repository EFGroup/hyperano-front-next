import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { user } from "apollo/requests";

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export default withIronSessionApiRoute(
  async function getData(req, res) {
    const {
      body,
      method,
    } = req;
    switch (method) {
      case 'POST':
        try {
          const { data } = await client.query({
            query: user.register,
            variables: body,
          });
          return res.status(200).json(data);
        } catch (error) {
          return res.status(400).json(error);
        }
    
      default:
        res.setHeader('Allow', ['POST'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  },
  cookie
);
