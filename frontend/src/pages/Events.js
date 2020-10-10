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

const Events = () => {

    const [events,setEvents]  = useState([]);
   

    const Auth_Context = useContext(AuthContext);
    const Preloader_Context = useContext(PreloaderContext);

    const { register, handleSubmit,getValues } = useForm();

    const createEventWrapperRef = useRef(null);
    const createEventRef = useRef(null);

    const tl = gsap.timeline();

    useEffect(()=>{
        gsap.set(createEventWrapperRef.current,{backgroundColor:'transparent',pointerEvents:'none'});
        gsap.set(createEventRef.current,{alpha:0,pointerEvents:'none',scale:.5});
    },[])

    useEffect( () => {

   const fetchEvents  = async () =>{

    const requestBody = {

        query: `
        query{
            events{
               _id
              title
              description
              price
              date
              creator{
                _id
                email
                createdEvents{
                  _id
                  title
                }
              
              }
            }
            }
        `
    
        
    }

    const jsonData  = JSON.stringify(requestBody);

   try{

    Preloader_Context.toogleLoading(true);
    const response = await  fetch('http://localhost:3000/graphql',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            
        },
        body:jsonData
     })

     const { data } = await response.json();
    
     setEvents(data.events);
     Preloader_Context.toogleLoading(false);

   } catch(err){
    throw Error(err)
   }
    
    

     

   }

   fetchEvents();

   

},[])
  

    const handleOpenCreateEvent = () => {

    tl.to(createEventWrapperRef.current,{backgroundColor:'rgba(0,0,0,0.7)',pointerEvents:'initial',duration:.3});
    tl.to(createEventRef.current,{alpha:1,scale:1,pointerEvents:'initial'});

    }

    const handleCloseCreateEvent = () => {

    tl.to(createEventWrapperRef.current,{backgroundColor:'transparent',pointerEvents:'none',duration:.3});
    tl.to(createEventRef.current,{alpha:0,pointerEvents:'none',scale:.5});

}

const onSubmit = () =>{

const { title, price ,date, text }= getValues();


const createEvent = async () => {

    const requestBody = {

        query: `
        mutation{
            createEvent(eventInput:{
              title:"${title}"
              description:"${text}"
              price:${price}
              date:"${date}"
              
            }){
                _id
                title
                description
                price
                date
                creator{
                    _id
                    email
                }
            }
          }
        `
    
        
    }
    
    
    const token = Auth_Context.token;
    
    const jsonData  = JSON.stringify(requestBody);

try{

    const response = await fetch('http://localhost:3000/graphql',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:jsonData
     });
    
    const data = response.json();
    

} catch (err){
    throw Error(err);
}
}
createEvent();



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
                                    <TextField type="text" alt="event-title" id="title" name="title" ref={register}/>
                                </div>
                                <div className="event-form__element">
                                    <label htmlFor="price" className="event-form__element-label">Price</label>
                                    <TextField type="number" alt="event-price" id="price" name="price" ref={register}/>
                                </div>
                                <div className="event-form__element">
                                    <label htmlFor="date" className="event-form__element-label">Date</label>
                                    <TextField type="date" alt="event-date" id="date" ref={register} name="date"/>
                                </div>
                                <div className="event-form__element">
                                    <label htmlFor="description" className="event-form__element-label">Description</label>
                                    <TextareaAutosize  type="text" alt="event-decription" id="description" rows="4" ref={register} name="text"></TextareaAutosize >
                                </div>
                            </form>
                           
                           

                            <div className="create-event__background-btns">
                                <Button className="create-event__background-close"variant="outlined" color="secondary"  size="small"onClick={handleCloseCreateEvent}>wyjdź</Button>
                                
                                <Button
                                    variant="contained"
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
               events !== [] ? events.map(event=><Event event={event} key={event._id} userId={Auth_Context.userId} token={Auth_Context.token}/>) : 'Niestety nie posiadasz żadnych eventów'
            }

        </div>
      
        </>
     );
     
}
 
export default Events;