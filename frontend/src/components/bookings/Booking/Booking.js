import React from 'react';
import { Button } from '@material-ui/core';
import gsap from 'gsap';

import { handleDeleteBooking as deleteBooking } from "../../../utilities/bookingOperations";

import "./Booking.scss";

const Booking = ({booking,token,Preloader_Context}) => {
    
    const handleDeleteBooking  = async () =>{

        Preloader_Context.toogleLoading(true);
        
       const data  = await deleteBooking(booking._id,token);

       if(data !== null) {
                
        Preloader_Context.toogleLoading(false);

    }
    else Preloader_Context.toogleLoading(false);

    }
   
    
    return ( 
        <div className="bookings__booking">

            <h1 className="bookings__booking-title">title: {booking.event.title} Author: {booking.user.email}</h1>
            
            <Button variant="contained" className="bookings__booking-btn" color="primary" onClick={handleDeleteBooking}>usuń wypożyczenie</Button>

        </div>
     );

}
 
export default Booking;