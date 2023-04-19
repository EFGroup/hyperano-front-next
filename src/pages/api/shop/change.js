import { withIronSessionApiRoute } from 'iron-session/next';

// import { cookie, baseUrl } from 'utils/constants';
const baseUrl = process.env.API_SERVER_URL;

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

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
