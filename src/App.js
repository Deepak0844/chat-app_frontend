import { Switch, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/Signup/Signup";
import Signin from "./Pages/Signin/Signin";
import Chat from "./Pages/Chat/Chat";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Profile from "./Pages/Profile/Profile";
import { Suspense } from "react";
import { openRouter } from "./Router/OpenRouter";
import { ToProtect } from "./Router/ProtectedRouter";
import RouterProtection from "./Router/RouterProtection";
import Spinner from "./Components/Helper/Spinner";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Suspense fallback={<Spinner />}>
        <Switch>
          {openRouter.map((route, index) => {
            return (
              <Route
                path={route.path}
                component={route.component}
                exact={route.exact}
                key={index}
              />
            );
          })}
          {ToProtect.map((route, index) => {
            return (
              <RouterProtection
                path={route.path}
                key={index}
                component={route.component}
                exact={route.exact}
              />
            );
          })}
          {/* <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Chat} />
        <Route exact path="/profile" component={Profile} /> */}
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
