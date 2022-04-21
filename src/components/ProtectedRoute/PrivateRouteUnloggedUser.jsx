import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRouteUnloggedUser({ children, ...rest }) {
  const isLogin = useSelector((state) => state.userData.isLogin);
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
}

export default PrivateRouteUnloggedUser;
