const Event = require('../../models/event');
const User = require('../../models/user');
const DataLoader = require('dataloader');

const eventLoader = new DataLoader((event_id)=> events(event_id));

const userLoader = new DataLoader((user_id)=>  User.find({ _id: {$in: user_id} }));

const events = async event_id =>{
    try{
        
        const events = await Event.find({ _id : {$in:event_id}})
        
       return events.map(event=>getEventsData(event))
    } catch(err) {

        throw err;
    }

   
}
    
    
const user = async user_id =>{
    
        
        try{
            
            const user = await userLoader.load(user_id.toString());
           
           
            return {...user._doc,_id: user.id,createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)};

        } catch(err){
            throw err;
        }

}

const singleEvent = async event_id =>{
    try{
     const event = await eventLoader.load(event_id.toString());
     
    return event;

    }catch (err) {
        throw err;
    }
}

const getEventsData  = (event) =>{
  
    
    return{
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date).toISOString(),
    
    creator: user.bind(this,event.creator)
}

}

const getBookingData = (booking) =>{
    return{
        ...booking._doc,
         _id: booking.id,
        createdAt: dateToString(booking.createdAt),
        updateAt: dateToString(booking.updateAt),
        user: user.bind(this,booking._doc.user),
        event: singleEvent.bind(this,booking._doc.event)
    }
}


const dateToString = (date) => new Date(date)


const validateUserData = ({email,password}) =>{



     if(!email && !password) throw new Error('Podaj e-maila i hasło !');
     
     
     else if(!email) throw new Error('Podaj e-maila !');
     
}

    module.exports = {
        events,
        user,
        singleEvent,
        getEventsData,
        dateToString,
        getBookingData,
        validateUserData
    }