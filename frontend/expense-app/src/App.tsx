import React, {Component} from 'react';
// import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "node_modules/boostrap/dist/css/bootstrap.min.css"
import {Switch, Route, Link} from "react-router-dom";

import add from "./components/add";
import home from "./components/home";
import update from "./components/view";

class App extends Component {
  render(){
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            My Expense Tracker
          </Link>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={"/expenses"} className='nav-link'>
                Expenses
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={"/add"} className='nav-link'>
                Add
              </Link>
            </li>       
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/" , "/expenses"]} component={home} />
            <Route exact path={"/add"}  component={add}/>
            <Route path={["/expenses/:id" ]} component={update}/>          
          </Switch>
        </div>  
      </div>
    )
  }  

}

export default App;
