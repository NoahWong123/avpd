import './App.scss';
import {Route,} from 'react-router-dom';
import {Switch} from 'react-router';
import React from "react";
import {Home} from "./Home";
import {CreateClassroomForm} from "./instructor/InstructorHome";

function App() {
  return (
    <Main/>
  );
}

function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/create-classroom" component={CreateClassroomForm}/>
    </Switch>
  )
}

export default App;
