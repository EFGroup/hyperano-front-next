import { withIronSessionApiRoute } from 'iron-session/next';
import client from "apollo/apollo-client";
import { payment } from "apollo/requests";

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
      query: { order: ids },
      session: { user: userSession },
    } = req;
    switch (method) {
      case 'GET':
        try {
          if (userSession) {
            const { data: { paymentType: data } } = await client.query({
              query: payment.list,
              variables: body,
              context: {
                serviceName: "auth",
                  headers: {
                    authorization: `Bearer ${userSession?.token}`
                }
              }
            });
            return res.status(200).json(data);
          }
          return res.status(200).json([]);
        } catch (error) {
          return res.status(400).json(error);
        }
      
      case 'POST':
        try {
          if (userSession) {
            const { data: { onlinePayment: { model, messages, online_payment_refId } } } = await client.mutate({
              mutation: payment.onlinePayment,
              variables: body,
              context: {
                serviceName: "auth",
                  headers: {
                    authorization: `Bearer ${userSession?.token}`
                }
              }
            });
            return res.status(200).json({ model, messages, online_payment_refId });
          }
          return res.status(200).json([]);
        } catch (error) {
          return res.status(400).json(error);
        }
    
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  },
  cookie
);