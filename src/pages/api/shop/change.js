import { withIronSessionApiRoute } from 'iron-session/next';

import { cookie, baseUrl } from 'utils/constants';

export default withIronSessionApiRoute(
  async function signIn(req, res) {
    const { shop } = req.body;
    if (!shop) {
      return res.status(400).end();
    }
    try {
      req.session.user = {
        ...req.session?.user,
        shop
      };
      await req.session.save();
      return res.status(200).json({ message: 'shop changed successfully' });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  cookie
);
