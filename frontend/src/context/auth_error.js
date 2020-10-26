import { createContext } from 'react';

export default createContext({
    error: false,
    toogleError:(state)=>{},
    setErrorText:(text)=>{},
    errorType: ''
})