import React from "react";
import { Redirect, Route } from "react-router";

function AccessOnAuth({ component: Component, auth: Auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !Auth ? <Redirect to='/' /> : <Component auth={Auth} />
      }
    />
  );
}

function UnaccessOnAuth({ component: Component, auth: Auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        Auth ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
}

export { AccessOnAuth, UnaccessOnAuth };
