import React from 'react';
import { GlobalStyles } from './GlobalStyles';
import Nav from './Common/Nav';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalStyles />
        <Nav />
      </BrowserRouter>
    </div>
  );
}

export default App;
