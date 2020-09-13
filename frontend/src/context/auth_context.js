import React,{ createContext } from 'react';

export default createContext({
    token:null,
    login:( token,userId,tokenDuration )=>{},
    logout:()=>{}
});