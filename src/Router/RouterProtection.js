import { Route, Redirect } from "react-router-dom";

export default function RouterProtection(props) {
  const userInfo = localStorage.getItem("loginInfo");
  const token = localStorage.getItem("token");

  if (userInfo !== null && token !== null) {
    //token and userinfo is not null protected routes will accessible
    return <Route {...props} />;
  } else {
    //return to sign in page
    return <Redirect to="/signin" />;
  }
}
