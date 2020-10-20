import React,{ useRef,useState,useContext } from 'react';

import { Button,Typography } from '@material-ui/core';
import PreloaderContext from '../../context/preloader_context';


import { bookEvent } from "../../utilities/eventOperations";


import './Event.scss';

const Event = ({event,userId,token}) => {

    const [eventDetails,setEventDetails] = useState(false);
    const eventDetailsBack = useRef(null);

    const Preloader_Context = useContext(PreloaderContext);

    const { title,description,creator,price,date }  = event;

    const newDate = new Date(date);

    const handleEventDetailsClick = () => setEventDetails(!eventDetails);
        
    const handleBookEvent = async() =>{
        Preloader_Context.toogleLoading(true);

        const  data  = await await bookEvent(event._id,token);

        if(data !== null) {
            
            

            Preloader_Context.toogleLoading(false);

        }
        
     
    }    

    
   
    return ( 
        <>

        <div className="event">
                <h1 className="event__title">{title}</h1>
                <p className="event__text">{description} - {price}zł</p>
                <b className="event__date">{newDate.toLocaleString()}</b>

                <div className="event__details">
                   {userId === creator._id ? <p>Jesteś twórcą tego eventu</p>:<Button variant="contained" style={{margin:'10px 0'}} className="event__details-btn" color="primary" onClick={handleEventDetailsClick}>szczegóły</Button>} 
                </div>
        </div>

        <div className={eventDetails?"event-details event-details--active":"event-details "} ref={eventDetailsBack}>

            <div className="event-details__wrapper">

                <h4 className="event-details__title">szczegóły</h4>
                <h6 className="event-details__email">Email twórcy : {creator.email}</h6>
                <p className="event-details__text">Stworzone eventy ({creator.createdEvents.length}):</p>
                <ol className="event-details__list">
                            {creator.createdEvents.map(createdEvent=><li key={createdEvent._id} className="event-details__item">{createdEvent.title}</li>)}
                </ol>
     
                <div className="event-details__buttons">
                        <Button variant="outlined" color="secondary"  size="small" onClick={()=>setEventDetails(false)} className="event-details__title">Wyjdź</Button>
                        <Button variant="contained" color="primary" onClick={handleBookEvent} > Wypożycz</Button>
                </div>

            </div>

        </div>

        </>
     );
}
 
export default Event;