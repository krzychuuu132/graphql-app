const Event = require('../../models/event');
const User = require('../../models/user');

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
            const user = await User.findById(user_id);
           
            return {...user._doc,_id: user.id,createdEvents:events.bind(this,user._doc.createdEvents)};

        } catch(err){
            throw err;
        }

}

const singleEvent = async event_id =>{
    try{
     const event = await Event.findById(event_id);

    return getEventsData(event);

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


    module.exports = {
        events,
        user,
        singleEvent,
        getEventsData,
        dateToString,
        getBookingData
    }