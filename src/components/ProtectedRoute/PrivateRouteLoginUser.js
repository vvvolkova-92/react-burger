import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function PrivateRouteLoginUser({ children, ...rest }) {
  const isLogin = useSelector((state) => state.userReducer.isLogin);
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={() =>
        !isLogin ? children : <Redirect to={location?.state?.from || "/"} />
      }
    />
  );
}

export default PrivateRouteLoginUser;