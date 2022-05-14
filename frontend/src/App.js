import React from 'react';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import DatabaseMaker from './components/databaseMaker.components';
// import { ChakraProvider } from '@chakra-ui/react'
// import LogRocket from 'logrocket';
// LogRocket.init('79q1lf/demo-project');


function App() {
  return (
    <DatabaseMaker />
  );
}

export default App;
