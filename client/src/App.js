import React from 'react';
import { GlobalStyles } from './GlobalStyles';
import Nav from './Common/Nav';
import Footer from './Common/Footer';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';

function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalStyles />
        <Nav />
        <Switch>
          <Route
            path='/shop/:category?/:sortMethod?/:keyword?/:pageNumber?'
            component={Shop}
          />
          <Route path='/shop' component={Shop} />
          <Route path='/' exact component={Home} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
