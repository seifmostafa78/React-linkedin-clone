import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import { getUserAuth } from './redux/actions';
import { connect } from 'react-redux';
import RequireAuth from './components/RequireAuth';

const App = (props) => {
  useEffect(() => {
    props.getUserAuth
  }, [])

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" 
          element=
          {
          <RequireAuth>
            <Header/>
            <Home/>
          </RequireAuth>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserAuth: () => dispatch(getUserAuth()),
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(App);

