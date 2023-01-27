import {   Redirect  } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
    const { component: Component, path, componentProps, ...rest } = props;
    
    // const user_id = useSelector(state => state.account.selectedAccount);
    const email = useSelector(state => state.email)
    console.log('email', email)

    if (!email) return <Redirect
        to={{
            pathname: "/login",
        }}
    />

    return <Component {...props} {...componentProps} />
};

export default PrivateRoute;