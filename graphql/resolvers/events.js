const event = require('../../models/event');
const Event = require('../../models/event');
const User = require('../../models/user');
const { getEventsData,dateToString } = require('../utililties/functions');





const eventsResolver = {
    events:async (args,req)=>{
      
       try{
                const events = await Event.find();
               
              
                return events.map(event =>getEventsData(event));

         }   catch(err){
             throw err;
         }
           

         
      
    },

    createEvent:async (args,req)=>{
         const { eventInput: arg }  = args;

        if(!req.isAuth){
            throw new Error('Unauthenthicated')
        }
       

         try{
            const event = new Event({
                title: arg.title,
                description: arg.description,
                price: arg.price,
                date: dateToString(arg.date),
                creator: req.userId
            });
            let createdEvent;

            const result = await event.save();
           
                createdEvent = getEventsData(result);
             
                 const user = await  User.findById(req.userId);
                
                    if(!user) {
                        throw new Error('User not found')
                    }

                    user.createdEvents.push(event);

                    await  user.save();

                    return createdEvent;

                } catch(err){
                    throw err;
                }
           
           
            
            
       
           
    },
 
}

module.exports = eventsResolver;