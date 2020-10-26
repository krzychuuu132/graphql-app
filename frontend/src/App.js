import React,{ useState } from 'react';
import { BrowserRouter as Router,Route,Switch, Redirect } from 'react-router-dom';


import Events from './pages/Events';
import Bookings from './pages/Bookings';

import Navigation from './components/Navigation/Navigation';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './components/Error/Error';

// Context
import AuthContext from './context/auth_context';
import PreloaderContext from './context/preloader_context';
import AuthError from './context/auth_error';

import './components/Main/Main.scss';


const App = () => {

  const [ loginData,setLoginData ] = useState({
    token: null,
    userId : null
  });

  const [loading,setLoading]  = useState(false);
  const [error,setError]  = useState(false);
  const [errorType,setErrorType]  = useState('');

 const login = (token,userId,tokenDuration) =>{
    setLoginData({token,userId})
  }

  const logout = () =>{
    setLoginData({token:null,userId:null})
  }

  const toogleLoading = (active) =>{
    setLoading(active);
  }

  const toogleError  = (state) =>{
    setError(state);
  }

  const setErrorText = (text) =>{
   
    setErrorType(text);
  }

  return (

    <Router>

     

        <AuthContext.Provider value={{
          token : loginData.token,
          userId :loginData.userId,
          login: login,
          logout: logout
        }}>
            <Navigation />

            <main className="main">

              <PreloaderContext.Provider value={{
                loading,
                toogleLoading
              }}>

                <AuthError.Provider value={{
                  error,
                  toogleError,
                  errorType,
                  setErrorText,
                 
                }}>

                  <Switch>

                      {!loginData.token && <Redirect from="/" to="/login" exact/>}
                      {!loginData.token && <Redirect from="/events" to="/login" exact/>}
                      {!loginData.token && <Redirect from="/bookings" to="/login" exact/>}
                      {loginData.token && <Redirect from="/" to="/events" exact/>}
                      {loginData.token && <Redirect from="/login" to="/events" exact/>}
                      <Route path="/login" component={Login} />
                      <Route path="/Register" component={Register} />
                      <Route path="/events" component={Events} />
                      <Route path="/bookings" component={Bookings} />
                      <Route >
                          <Error />  
                      </Route>

                  </Switch>

                </AuthError.Provider> 

              </PreloaderContext.Provider>
            
            </main>

            </AuthContext.Provider>
    

    </Router>

  );
}

export default App;
