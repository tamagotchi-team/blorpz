import React from 'react';
import routes from './routes'
import { withRouter } from 'react-router-dom'
import Nav from './Components/Nav/Nav'


import './App.css';


function App(props) {
  return (
    
    <div className="App">


      {props.location.pathname === "/"
      ? (
        <>
        {routes}
        </>
      ) : (
        <>
        <Nav />
        {routes}
        </>
      ) 
      }
    </div>
  );
}

export default withRouter(App);
