import { withIronSessionApiRoute } from 'iron-session/next';

import client from "apollo/apollo-client";
import { user } from "apollo/requests";

// import { cookie, baseUrl } from 'utils/constants';
const baseUrl = process.env.API_SERVER_URL;

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export default withIronSessionApiRoute(
  async function handler(req, res) {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname) {
      res.status(400).end();
    }

    const {data: { activateUser : { user: userData }}, error} = await client.mutate({
      mutation: user.activateUser,
      variables: formState
    });

    if (error) {
      res.status(500);
    }

    req.session.user = {
      token: userData.token
    };
    await req.session.save();
    res.status(200).json({ token: userData.token });
  },
  cookie
);
