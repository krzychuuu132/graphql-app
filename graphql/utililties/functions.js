const Event = require('../../models/event');
const User = require('../../models/user');

const events = async event_id =>{
    try{

        const events = await Event.find({ _id : {$in:event_id}})
        
       return events.map(event=>{
          
            return{
                ...event._doc,
                _id: event._id,
                creator: user.bind(this,event._doc.creator),
                date: new Date(event._doc.date).toISOString()
            }
        })
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

    module.exports = {
        events,
        user
    }