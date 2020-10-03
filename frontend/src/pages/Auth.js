import React,{ useRef, useState,useContext } from 'react';
import axios from 'axios';
import { fetchAuth } from '../utilities/fetchAuth';

import AuthContext from '../context/auth_context';
import PreloaderContext from '../context/preloader_context';

import Preloader from '../components/Preloader/Preloader';

const Auth = ({login}) => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const dataContext = useContext(AuthContext);
    const Preloader_Context = useContext(PreloaderContext);

    const handleSubmit  =  async e  =>{

        e.preventDefault();
        Preloader_Context.toogleLoading(true);

        const password  = passwordRef.current.value;
        const email  = emailRef.current.value;
        
       
     const { data } =  await fetchAuth(login,password,email);
     if(login){

     if(data !== null && data.login.token){
         const { token,userId,tokenDuration } = data.login;

         dataContext.login(token,userId,tokenDuration);
        
    }
    Preloader_Context.toogleLoading(false);


}


    }


  

    return ( 

        <form className="form" onSubmit={handleSubmit}>
    
                    <div className="form__data">
                                <label className="form__label" htmlFor="email">E-mail</label>
                                <input type="email" id="email" ref={emailRef}/>
                    </div>

                    <div className="form__data">

                                <label className="form__label" htmlFor="password">E-mail</label>
                                <input type="password" id="password" ref={passwordRef}/>

                    </div>

                    <div className="form__buttons">

                                
                                <button className="form__btn-login" type="submit">{login?'zaloguj się':'zarejersruj się'}</button>

                    </div>
                    <Preloader />
        </form>

     );
     
}
 
export default Auth;