import { withIronSessionApiRoute } from 'iron-session/next';

// import { cookie, baseUrl } from 'utils/constants';
const baseUrl = process.env.API_SERVER_URL;

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export default withIronSessionApiRoute(
  function signOut(req, res) {
    req.session.destroy();
    return res.status(200).json({ ok: true });
  },
  cookie
);