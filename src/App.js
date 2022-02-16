import React, {useEffect} from 'react'
import './app.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {getPackages} from './actions/package'
import {USER_GET} from './constants/actionTypes'

import Home from './components/home/Home'
import Nav from './components/navbar/Nav'
import Form from './components/form/Form';
import History from './components/history/History'
import Login from './components/auth/Login'
import Register from './components/auth/Register';
import Dashboard from './components/admin/Dashboard'
import Modal from './components/popUp/Modal'
import Account from './components/account/Account';
import AdminLogin from './components/admin/Login'
import NavAdmin from './components/navbar/NavAdmin';

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  //get all riwayat for the first time + user from localstorage
  useEffect(()=>{
    dispatch({type: USER_GET})
  },[dispatch])

  //checking wheter user is admin
  function isAdmin(){
    if(user!==null && user.type==='admin'){
      return true
    }
  }

  //checking wheter user is user
  function isUser(){
    if(user!==null && user.type==='user'){
      return true
    }
  }
  
  return (
    <div className="App">
      <Modal/>

      <Router>
        <Switch>

          <Route path="/adminLogin">
            <AdminLogin/>
          </Route>

          <Route exact path="/admin">
            {isAdmin() ? <><NavAdmin/><Dashboard/></> :<Redirect to="/adminLogin" />}
          </Route>

          <Route path="/register">
            <Register/>
          </Route>

          <Route path="/login">
            <Login/>
          </Route>

          <Route exact path="/riwayat">
            {isUser() ? <><Nav/><History /></> :<Redirect to="/login" />}
          </Route>

          <Route exact path="/kirim">
            {isUser() ? <><Nav/><Form /></> :<Redirect to="/login" />}
          </Route>

          <Route exact path="/akun">
            {isUser() ? <><Nav/><Account /></> :<Redirect to="/login" />}
          </Route>

          <Route path="/">
            <Nav />
            <Home/>
          </Route>

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
