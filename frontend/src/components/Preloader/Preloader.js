import React,{ useContext } from 'react';
import { CircularProgress } from "@material-ui/core";

import PreloaderContext from "../../context/preloader_context";

import "./Preloader.scss";

const Preloader = () => {

    const Preloader_Context = useContext(PreloaderContext);
  

    return (  
        Preloader_Context.loading ? <div className="preloader"> 
       
             <CircularProgress color="primary" size={80}/>

       </div> : null
    );
}
 
export default Preloader;