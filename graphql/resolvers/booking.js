const { getEventsData,getBookingData } = require('../utililties/functions');
const Booking = require('../../models/booking');


const bookingResolver = {

   bookings: async (args,req)=>{

        if(!req.isAuth){
            throw new Error('Unauthenthicated')
        }

        try{
        const bookings = await  Booking.find();
        return bookings.map(booking=>getBookingData(booking))


        } catch(err){
            throw err;
        }
    },

    bookEvent: async (args,req)=>{

        if(!req.isAuth){
            throw new Error('Unauthenthicated')
        }

        const {  eventId } = args;

        try{
          
            const fetchedEvent = await Event.findById({_id: eventId });
        
            
            const booking = new Booking({
                user: req.userId,
                event: fetchedEvent
            });

            const result = await booking.save();
       

            return getBookingData(result);
            
        }

        catch(err){
            throw err;
        }
       
       
    },

    cancelBooking: async (args,req) =>{
        
        if(!req.isAuth){
            throw new Error('Unauthenthicated')
        }

        const { bookingsID } = args;
        

        try{
        const booking = await Booking.findById(bookingsID).populate('event');
   

        const event = getEventsData(booking.event)

         await Booking.deleteOne({_id: bookingsID});

      
        return event
            
        
        } catch(err){
            throw err;
        }
    }

}

module.exports = bookingResolver;