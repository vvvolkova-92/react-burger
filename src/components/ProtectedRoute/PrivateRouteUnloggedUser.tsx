import { Route, Redirect } from "react-router-dom";
import { useSelector } from "../../services/types/hooks";
import { ProfilePage } from "../../pages/Profile/Profile";
import { FC } from "react";
import { TRouteLogin } from "../../services/types/interfaces";

export const PrivateRouteUnloggedUser: FC<TRouteLogin> = ({ children, ...rest }) => {
  const { isLogin } = useSelector((state) => state.userReducer);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export const PrivateRouteModal: FC<TRouteLogin> = ({ children, ...rest }) => {
  const { isLogin } = useSelector((state) => state.userReducer);
  return (
    <Route
        {...rest}
        render={(e) => {
          if (!isLogin) return <Redirect to={{ pathname: "/login", state: { from: e.location } }} />
          if (e.match.path === "/profile/orders") {
            return <ProfilePage />
          }
          if (isLogin && e.match.path === "/profile/orders/:id") {
            return children
          }

        }}
      />
  );
};



