import { toast } from "react-toastify";

export default function nextApiApolloErrHandling({ graphQLErrors, networkError, clientErrors, message }) {
  if (networkError) {
    toast.error("خطای شبکه! دوباره امتحان کنید");
  }
  else if (graphQLErrors) {
    graphQLErrors.map( ({ message, extensions }) => {
      if(message === "validation") {
        Object.values(extensions.validation).flat().map( errMessage => toast.error(errMessage) )
      }else {
        toast.error(String(message.split('@')[0]))
      }
    })
  }
  else if (clientErrors) {
    toast.error("خطای کاربر! دوباره امتحان کنید");
  }
  else {
    toast.error(message);
  }
}