import React from 'react';
import {BrowserRouter as Router , Route} from "react-router-dom";
import DatabaseMaker from './components/databaseMaker.components';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Route path="/" extract component={DatabaseMaker}  />
      </Router> */}
      <DatabaseMaker />
    </div>
  );
}

export default App;
