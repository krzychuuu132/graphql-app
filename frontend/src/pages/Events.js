import React,{ useRef , useState,useEffect,useContext } from 'react';
import  gsap  from 'gsap';
import { useForm } from "react-hook-form";

import AuthContext from "../context/auth_context";
import PreloaderContext from "../context/preloader_context";

import Event from '../components/Event/Event';

import './Events.scss';
import Preloader from '../components/Preloader/Preloader';

import AddEventIcon from '@material-ui/icons/AddBox';

import { Button,TextField,TextareaAutosize } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { fetchEvents,createEvent } from '../utilities/eventOperations';

const Events = () => {

    const [events,setEvents]  = useState([]);
   

    const Auth_Context = useContext(AuthContext);
    const Preloader_Context = useContext(PreloaderContext);

    const { register, handleSubmit,getValues,errors } = useForm();

    const createEventWrapperRef = useRef(null);
    const createEventRef = useRef(null);

    const tl = gsap.timeline();

    useEffect(()=>{
        gsap.set(createEventWrapperRef.current,{backgroundColor:'transparent',pointerEvents:'none'});
        gsap.set(createEventRef.current,{alpha:0,pointerEvents:'none',scale:.5});
    },[])

    useEffect(  () => {

 
        const fetchData  = async () =>{

            Preloader_Context.toogleLoading(true);

            const data  = await fetchEvents();

            if(data !== null) {
                console.log(data)
                
                setEvents(data.events);
            
               Preloader_Context.toogleLoading(false);
            
            }
            else Preloader_Context.toogleLoading(false);
        }
   
      fetchData();
   

},[])
  

    const handleOpenCreateEvent = () => {

    tl.to(createEventWrapperRef.current,{backgroundColor:'rgba(0,0,0,0.7)',pointerEvents:'initial',duration:.3});
    tl.to(createEventRef.current,{alpha:1,scale:1,pointerEvents:'initial'});

    }

    const handleCloseCreateEvent = () => {

    tl.to(createEventWrapperRef.current,{backgroundColor:'transparent',pointerEvents:'none',duration:.3});
    tl.to(createEventRef.current,{alpha:0,pointerEvents:'none',scale:.5});

}

const onSubmit = async () =>{
   

const { title, price ,date, text }= getValues();

Preloader_Context.toogleLoading(true);

const data = await createEvent(title,parseFloat(price),date,text,Auth_Context.token);


if(data !== null) {
    
  

   Preloader_Context.toogleLoading(false);

}
else Preloader_Context.toogleLoading(false);

}


    return ( 
        <>
        <div className="create-event">
              
                <h1 className="create-event__title">Stwórz swój własny Event i pokaż go wszystkim !</h1>

                <Button  className="create-event__btn" onClick={handleOpenCreateEvent} variant="contained" color="primary" fullWidth >Stwórz Event   <AddEventIcon className="create-event__btn-icon">add_circle</AddEventIcon></Button>

                <div className="create-event__background" ref={createEventWrapperRef}>

                        <div className="create-event__add" ref={createEventRef}>

                            <h2 className="create-event__background-title"> Dodaj event</h2>

                            <form className="event-form" onSubmit={handleSubmit(onSubmit)} id="form">
                                <div className="event-form__element">
                                    <label htmlFor="title" className="event-form__element-label">Title</label>
                                    <TextField type="text" alt="event-title" id="title" name="title" inputRef={register} required/>
                                </div>
                                <div className="event-form__element">
                                    <label htmlFor="price" className="event-form__element-label">Price</label>
                                    <TextField type="" alt="event-price" id="price" name="price" inputRef={register} required/>
                                </div>
                                <div className="event-form__element">
                                    <label htmlFor="date" className="event-form__element-label">Date</label>
                                    <TextField type="date" alt="event-date" id="date" inputRef={register} name="date" required/>
                                </div>
                                <div className="event-form__element">
                                    <label htmlFor="description" className="event-form__element-label">Description</label>
                                    <TextareaAutosize   alt="event-decription" id="description" rows="4" ref={register} name="text" required></TextareaAutosize>
                                </div>
                            </form>
                           
                           

                            <div className="create-event__background-btns">
                                <Button className="create-event__background-close"variant="outlined" color="secondary"  size="small"onClick={handleCloseCreateEvent}>wyjdź</Button>
                                
                                <Button
                                    variant="contained"
                                    type="submit"
                                    form="form"
                                    color="primary"
                                    size="small"
                                    className="create-event__background-save"
                                    startIcon={<SaveIcon />} >
                                    Zapisz
                                </Button>

                               
                            </div>
                        </div> 
                </div>
                
                <Preloader />
        </div>

        <div className="events">

            {
               events.length !== 0 ? events.map(event=><Event event={event} key={event._id} userId={Auth_Context.userId} token={Auth_Context.token}/>) : 'Niestety nie posiadasz żadnych eventów'
            }

        </div>
      
        </>
     );
     
}
 
export default Events;