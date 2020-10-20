import { createContext } from 'react';


export default createContext({
    loading: false,
    toogleLoading: (active)=> {}
});