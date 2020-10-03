import React,{ useEffect , useState , useContext } from 'react';
import Booking from '../components/Booking/Booking';

import Preloader from "../components/Preloader/Preloader";

import AuthContext from "../context/auth_context";
import PreloaderContext from "../context/preloader_context";

import { getBookings } from "../utilities/eventOperations";


const Bookings = () => {

    const [bookings,setBookings] = useState([]);

    const Auth_Context = useContext(AuthContext);
    const Preloader_Context = useContext(PreloaderContext);

    useEffect( () => {
      
        const getData = async ()=>{

            Preloader_Context.toogleLoading(true);

            const  data  = await getBookings(Auth_Context.token,setBookings);

            if(data !== null) {
                
                setBookings(data.bookings);

                Preloader_Context.toogleLoading(false);

            }
            else Preloader_Context.toogleLoading(false);
           
        }

        getData();
       

    },[] )

    return ( 

        <div className="bookings">
            {
                bookings.map(booking=><Booking booking={booking} id={booking._id}/>)
            }

            <Preloader />
        </div>

     );
     
}
 
export default Bookings;