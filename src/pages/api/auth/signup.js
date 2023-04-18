import { withIronSessionApiRoute } from 'iron-session/next';

import client from "apollo/apollo-client";
import { user } from "apollo/requests";

import { cookie, baseUrl } from 'utils/constants';

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
