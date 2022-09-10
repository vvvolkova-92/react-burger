import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function PrivateRouteLoginUser({ children, ...rest }) {
  const isLogin = useSelector((state) => state.userReducer.isLogin);
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  return (
    <Route
      {...rest}
      render={() =>
        !isLogin ? children : <Redirect to={location ? location.state.from : "/"} />
      }
    />
  );
}

export default PrivateRouteLoginUser;