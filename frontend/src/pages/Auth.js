import React,{ useRef, useState,useContext } from 'react';
import axios from 'axios';
import { fetchAuth } from '../utilities/fetchAuth';
import { Input,Button,Link as MaterialLink } from '@material-ui/core';

import AuthContext from '../context/auth_context';
import PreloaderContext from '../context/preloader_context';

import Preloader from '../components/Preloader/Preloader';

import bookPicture from '../images/3899626.jpg';
import { ReactComponent as BookLogo } from '../images/booking.svg';

import "./Auth.scss";
import { Link } from 'react-router-dom';

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
        console.log(email)
       
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

    <div className="form-wrapper">

        <div className="form-wrapper__picture">
            <img src={bookPicture} alt="booking-picture" className="form-wrapper__img"/>
        </div>

        <form className="form" onSubmit={handleSubmit}>
            
                    <h2 className="form__title">{login? "Zaloguj się":"Zarejestruj się"}</h2>

                    <div className="form__data">
                                <label className="form__label" htmlFor="email">Email</label>
                                <Input type="email" id="email" inputRef={emailRef} placeholder="Podaj adres E-mail" className="form__input"/>
                    </div>

                    <div className="form__data">

                                <label className="form__label" htmlFor="password">Hasło</label>
                                <Input type="password" id="password" inputRef={passwordRef} placeholder="Podaj hasło" className="form__input"/>

                    </div>

                    <div className="form__buttons">

                                
                                <Button  className="form__btn-login" type="submit"  variant="contained" color="primary" fullWidth={true}>{login?'zaloguj się':'zarejestruj się'}</Button>

    

                    </div>

                        <Link component={MaterialLink} to={login?"/register":"/login"}>{login? "Nie masz konta? Zarejestruj się !":"Posiadasz już konto? Zaloguj się !"}</Link>

                    <Preloader />
        </form>

        <div className="form-wrapper__logo"> <BookLogo className="form-wrapper__logo-img"/> </div>

    </div>

     );
     
}
 
export default Auth;