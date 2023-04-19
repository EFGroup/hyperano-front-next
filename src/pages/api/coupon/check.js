import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { categoryCoupon } from "apollo/requests";

// import { cookie, baseUrl } from 'utils/constants';
const baseUrl = process.env.API_SERVER_URL;

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
      query,
      session: { user: userSession },
    } = req;
    switch (method) {
      case 'POST':
        try {
          if (userSession) {
            const { data: { checkCoupon: { model, total_coupon, messages } } } = await client.mutate({
              mutation: categoryCoupon.checkCoupon,
              variables: body,
              context: {
                serviceName: "auth",
                headers: {
                  authorization: `Bearer ${userSession?.token}`
                }
              }
            });
            return res.status(200).json({ model, total_coupon, messages });
          }
          return res.status(200).json([]);
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