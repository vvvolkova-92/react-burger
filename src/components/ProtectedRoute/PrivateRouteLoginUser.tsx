import { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "../../services/types/hooks";
import { ILocationState, TRouteLogin } from "../../services/types/interfaces";

const PrivateRouteLoginUser:FC<TRouteLogin> = ({ children, ...rest }) => {
  const isLogin = useSelector((state) => state.userReducer.isLogin);
  const location = useLocation<ILocationState>();
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