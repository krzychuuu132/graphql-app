import React,{ useEffect , useState , useContext } from 'react';
import Booking from '../components/bookings/Booking/Booking';
import Chart from '../components/bookings/Chart/Chart';

import Preloader from "../components/Preloader/Preloader";

import AuthContext from "../context/auth_context";
import PreloaderContext from "../context/preloader_context";

import { getBookings } from "../utilities/eventOperations";

import "./Bookings.scss";

const Bookings = () => {

    const [bookings,setBookings] = useState([]);
    const [bookingsPath,setBookingsPath] = useState('bookings');

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
        <>
        <div className="bookings__choice">
            <button onClick={()=>setBookingsPath('bookings')} className={bookingsPath === "bookings"?"bookings__choice-btn bookings__choice-btn--active":"bookings__choice-btn"}>bookings</button>
            <button onClick={()=>setBookingsPath('charts')} className={bookingsPath === "bookings"?"bookings__choice-btn":"bookings__choice-btn bookings__choice-btn--active"}>charts</button>
        </div>
        {
            bookingsPath === 'bookings' ? 
            
            <div className="bookings">

            {
                bookings.map(booking=><Booking booking={booking} id={booking._id} token={Auth_Context.token} Preloader_Context={Preloader_Context}/>)
            }

           </div> 
           
        :  <Chart bookings={bookings}/>

        }

        <Preloader />
         </>   
     );
     
}
 
export default Bookings;