import client from "apollo/apollo-client";
import { user } from "apollo/requests";

export default async function GetAuthenticatedUser(req, res) {
  const defaultReturnObject = { authenticated: false, userInfo: null };
  let userSession = req.session?.user;
  console.log("userSession", userSession)
  res.status(200).json({defaultReturnObject});
  // try {
  //   if (userSession) {
  //     const {data} = await client.query({
  //       query: user.get ,
  //       context: {
  //         serviceName: "auth",
  //         headers: {
  //           authorization: req?.headers?.authorization || null
  //           // authorization: `Bearer ${userSession?.token}`
  //         }
  //       }
  //     });
  //     res.status(200).json({data});
  //   }
  //   res.status(400).json(defaultReturnObject);
  // }

  // catch (err) {
  //   console.log('GetAuthenticatedUser, Something Went Wrong', err);
  //   res.status(400).json(defaultReturnObject);
  // }
}
