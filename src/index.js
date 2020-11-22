import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Main from './Main';
import Strings from './config/Strings.json';
import AppBar from './components/AppBar';
import Footer from "./components/Footer";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AppBar>{ Strings.Defaults.TitleAppBar }</AppBar>
    <Main />
    <Footer><a href={ Strings.Defaults.LinkFooter } target="_blank" rel="noreferrer">{ Strings.Defaults.LinkFooter }</a></Footer>
  </React.StrictMode>,
  document.getElementById( 'root' )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
