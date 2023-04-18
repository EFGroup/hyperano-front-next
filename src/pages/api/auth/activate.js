import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { user } from "apollo/requests";

import { cookie, baseUrl } from 'utils/constants';

export default withIronSessionApiRoute(
  async function getData(req, res) {
    const {
      body,
      method,
    } = req;
    switch (method) {
      case 'POST':
        try {
          const { data: { activateUser: { user: userData } }, error } = await client.query({
            query: user.activate,
            variables: body,
          });

          if (error) {
            res.status(500);
          }

          req.session.user = {
            token: userData.token
          };
          await req.session.save();
          return res.status(200).json({ ...userData });
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
