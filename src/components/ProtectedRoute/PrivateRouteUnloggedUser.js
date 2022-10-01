import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderDetailInFeed from "../OrderDetailInFeed/OrderDetailInFeed";
import { ProfilePage } from "../../pages/Profile/Profile";
export function PrivateRouteUnloggedUser({ children, ...rest }) {
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

export function PrivateRouteModal({ children, ...rest }) {
  const { isLogin } = useSelector((state) => state.userReducer);
  return (
    <Route
        {...rest}
        render={(e) => {
          if (isLogin && e.match.path === "/profile/orders") {
            console.log("/profile/orders");
            return <ProfilePage />
          } else if (isLogin && e.match.path === "/profile/orders/:id") {
            console.log("/profile/orders/:id");
            return <OrderDetailInFeed /> };
        console.log('Redirect');
        return <Redirect to={{ pathname: "/login", state: { from: e.location } }} />

        }}
      />
  );
};



