import React from 'react';
import { GlobalStyles } from './GlobalStyles';
import Nav from './Common/Nav';
import Footer from './Common/Footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';
import Product from './Product';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Shipping from './Shipping';
import Payment from './Payment';
import PlaceOrder from './PlaceOrder';
import Order from './Order';

function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalStyles />
        <Nav />
        <Switch>
          <Route
            path='/shop/category/:category?/sort/:sortMethod?/page/:pageNumber?'
            component={Shop}
            exact
          />
          <Route
            path='/shop/category/:category?/sort/:sortMethod?/search/:keyword?/page/:pageNumber?'
            component={Shop}
            exact
          />
          <Route path='/product/:slug/:id' component={Product}></Route>
          <Route path='/shop' component={Shop} />
          <Route path='/cart' component={Cart} />

          <Route path='/login/redirect=:redirectPath' component={Login} />
          <Route path='/register/redirect=:redirectPath' component={Register} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/shipping' exact component={Shipping} />
          <Route path='/payment' exact component={Payment} />
          <Route path='/order' exact component={PlaceOrder} />
          <Route path='/order/:id' exact component={Order} />

          <Route path='/' exact component={Home} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
