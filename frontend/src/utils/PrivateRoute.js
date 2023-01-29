import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const { component: Component, componentProps } = props;
  const email = useSelector((state) => state.email);

  if (!email)
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );

  return <Component {...props} {...componentProps} />;
};

export default PrivateRoute;
