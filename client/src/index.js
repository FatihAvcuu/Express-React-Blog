import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { UserProvider } from './context';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';

//pages
import Home from './pages/home'
import Blog from './pages/blog'
import AdminLogin from './pages/LoginAdmin'
import AdminPanel from './pages/panel'
import AdminEdit from './pages/edit'
import AdminAdd from './pages/addnew'

const routing = (
  <UserProvider>
    <Router>
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/blog' component={Blog} />
        <Route path='/admin' component={AdminLogin} />
        <PrivateRoute path='/panel' component={AdminPanel} />
        <PrivateRoute path='/edit' component={AdminEdit} />
        <PrivateRoute path='/addblog' component={AdminAdd} />
      </div>
    </Router>
  </UserProvider>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
