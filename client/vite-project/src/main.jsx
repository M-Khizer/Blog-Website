import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import SignupPage from './Components/SignUp.jsx';
import Login from './Components/SignIn.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './Redux/Store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App/>
      </Provider>
    </Router>
  </React.StrictMode>,
)
