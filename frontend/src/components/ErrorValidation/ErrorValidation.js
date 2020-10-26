import React,{ useContext,useEffect,useRef } from 'react';
import gsap from 'gsap';
import Alert from '@material-ui/lab/Alert';

import AuthError from '../../context/auth_error';

import './ErrorValidation.scss';


const ErrorValidation = () => {

    const Auth_error = useContext(AuthError);

    const errorElement = useRef(null);

    useEffect(()=>{

      gsap.fromTo(errorElement.current,{scale:.5,opacity:0},{scale:1,opacity:1});

    })
    
    
    return ( 
      Auth_error.error ?  

      <div className="error" ref={errorElement}>

      <Alert variant="filled" severity="error" className="error__element">
        
         {Auth_error.errorType}!
      </Alert>
           

      </div> 

        :null
     );
}
 
export default ErrorValidation;