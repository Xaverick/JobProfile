import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store/store.jsx'
import axios from 'axios'
import ReactGA from 'react-ga4';


ReactGA.initialize('G-5V1BM1T4EK');
// Optional: To track page views, use the following line
ReactGA.send({
  hitType: 'pageview',
  page: window.location.pathname
});


if (import.meta.env.DEV) {
  //for vite application
  console.log("Running in development mode");
  axios.defaults.baseURL = import.meta.env.VITE_LOCALHOST;
} else {
  console.log("Running in production mode");
  axios.defaults.baseURL = import.meta.env.VITE_PRODUCTION;
}
axios.defaults.withCredentials = true;


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  /* </React.StrictMode>, */
)
