import React from 'react';
import { BrowserRouter , Switch , Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/user/dashboard" component={Dashboard} />
            <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        </Switch>
    </BrowserRouter>
);

export default Routes;