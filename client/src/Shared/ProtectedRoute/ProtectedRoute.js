import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {UserContext} from '../context/User.context';

const ProtectedRoute = ({component: Component, condition, pathToRedir, ...rest}) => {

    const [user] = useContext(UserContext);
    condition = (condition === undefined ? user.isAuthenticated : condition);

    return(
        <Route {...rest} render={(props) =>(
            condition
            ? <Component {...props}/>
            : <Redirect to={pathToRedir ? pathToRedir : "/"}/>
        )}/>
    );
};

export default ProtectedRoute;