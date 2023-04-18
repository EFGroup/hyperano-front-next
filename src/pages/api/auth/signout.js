import { withIronSessionApiRoute } from 'iron-session/next';

import { cookie, baseUrl } from 'utils/constants';

export default withIronSessionApiRoute(
  function signOut(req, res) {
    req.session.destroy();
    return res.status(200).json({ ok: true });
  },
  cookie
);