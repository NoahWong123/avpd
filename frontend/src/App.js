import logo from './logo.svg';
import './App.scss';
import {
  BrowserRouter,
  Route,
  /*useNavigate,*/
} from 'react-router-dom';
import {
  Switch
} from 'react-router';
import ReportScreen from "./ReportScreen";
import NavBar from "./NavBar";
import React from "react";

function App() {
  return (
    <Main />
  );
}

function Main() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/report" component={ReportScreen}/>
      </Switch>
    </BrowserRouter>
  )
}

// This is a react functional component. It is basically a class disguised as a function. Functional components need to
// return JSX. JSX is just HTML with some added quirks so that you can write it directly within javascript instead of
// as its own file. The JSX that is returned whenever this component is evaluated is what the component will look like.
function Home(props) {
  // This is what will be rendered whenever this component is called.
  return (
    <div className="HomePage">
      <NavBar/>
      <button
        className="btn bad-essay-btn"
        onClick={() => props.history.push('/report', { probabilityOfAuthorship: 0.02, flag: true })}>
        Bad Essay
      </button>
      <button
        className="btn good-essay-btn"
        onClick={() => props.history.push('/report', { probabilityOfAuthorship: 0.95, flag: false })}>
        Good Essay
      </button>
    </div>
  )
}

export default App;
