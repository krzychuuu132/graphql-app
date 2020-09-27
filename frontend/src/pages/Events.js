import React,{ useRef , useState,useEffect,useContext } from 'react';
import  gsap  from 'gsap';
import { useForm } from "react-hook-form";
import AuthContext from "../context/auth_context";

import Event from '../components/Event/Event';

import './Events.scss';
import Preloader from '../components/Preloader/Preloader';


const Events = () => {

    const [events,setEvents]  = useState([]);
    const [loading,setLoading]  = useState(false);

    const Auth_Context = useContext(AuthContext);

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

    setLoading(true);
    const response = await  fetch('http://localhost:3000/graphql',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            
        },
        body:jsonData
     })

     const { data } = await response.json();
    
     setEvents(data.events);
     setLoading(false);

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
    console.log(data)

} catch (err){
    throw Error(err);
}
}
createEvent();



}


    return ( 
        <>
        <div className="create-event">
              
                <h1 style={{textAlign:'center'}} className="create-event__title">Stwórz swój własny Event i pokaż go wszystkim !</h1>

                <button style={{display:'block',margin:'0 auto'}} className="create-event__btn" onClick={handleOpenCreateEvent}>Stwórz Event</button>

                <div className="create-event__background" ref={createEventWrapperRef}>

                        <div className="create-event__add" ref={createEventRef}>

                            <h2 className="create-event__background-title"> Dodaj event</h2>

                            <form className="event-form" onSubmit={handleSubmit(onSubmit)} id="form">
                                <div className="event-form__element">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" alt="event-title" id="title" name="title" ref={register}/>
                                </div>
                                <div className="event-form__element">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" alt="event-price" id="price" name="price" ref={register}/>
                                </div>
                                <div className="event-form__element">
                                    <label htmlFor="date">Date</label>
                                    <input type="date" alt="event-date" id="date" ref={register} name="date"/>
                                </div>
                                <div className="event-form__element">
                                    <label htmlFor="description">Description</label>
                                    <textarea type="text" alt="event-decription" id="description" rows="4" ref={register} name="text"></textarea>
                                </div>
                            </form>
                           
                           

                            <div className="create-event__background-btns">
                                <button className="create-event__background-close" onClick={handleCloseCreateEvent}>wyjdź</button>
                                <button className="create-event__background-save" type="submit" form="form">zapisz</button>
                            </div>
                        </div> 
                </div>
                <Preloader active={loading}/>
        </div>

        <div className="events">

            {
               events !== [] ? events.map(event=><Event event={event} key={event._id} userId={Auth_Context.userId}/>) : 'Niestety nie posiadasz żadnych eventów'
            }

        </div>
      
        </>
     );
     
}
 
export default Events;