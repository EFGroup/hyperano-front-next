import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { user } from "apollo/requests";

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export default withIronSessionApiRoute(
  async function signIn(req, res) {
    const { cellphone, password } = req.body;
    if (!cellphone || !password) {
      return res.status(400).end();
    }
    try {
      const {data: { login: { user: userData } } } = await client.mutate({
        mutation: user.login,
        variables: {
          cellphone, password
        }
      });
      req.session.user = {
        token: userData.token
      };
      await req.session.save();
      return res.status(200).json({ ...userData });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);
