import UserConsumer from './context';
import { Route, Redirect } from "react-router-dom";
import React from 'react';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    return (
        <UserConsumer>
            {
                value => {
                    const { user } = value;
                    return (
                        <Route
                            {...rest}
                            render={routeProps =>
                                !!user ? (
                                    <RouteComponent {...routeProps} />
                                ) : (
                                        <Redirect to={"/admin"} />
                                    )
                            }
                        />
                    )
                }
            }
        </UserConsumer>
    );
};


export default PrivateRoute  