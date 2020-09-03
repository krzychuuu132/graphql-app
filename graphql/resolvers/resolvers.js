const bcrypt = require('bcryptjs');  

const { user,events,singleEvent,getEventsData,dateToString,getBookingData } = require('../utililties/functions');

const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const resolvers = {
        events:async ()=>{
          
       
             try{
                    const events = await Event.find();

                    return events.map(event =>getEventsData(event));

             }   catch(err){
                 throw err;
             }
               

             
          
        },
        createEvent:async (args)=>{
             const { eventInput: arg }  = args;

             try{
                const event = new Event({
                    title: arg.title,
                    description: arg.description,
                    price: arg.price,
                    date: dateToString(arg.date),
                    creator: '5f46e4fc690ad61c089aa66d'
                });
                let createdEvent;

                const result = await event.save();
               
                    createdEvent = getEventsData(result);
                 
                     const user = await  User.findById('5f46e4fc690ad61c089aa66d');
                    
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
        createUser:async (args)=>{
           

           

            try{
             const { userInput: arg } = args;    
                
            const existingUser = await User.findOne({email: arg.email});

                 if(existingUser) {
                     throw new Error('User already exists');
                 }
                
                 const hashedPassword =  await bcrypt.hash(arg.password, 12);
              
                 const user = new User({
                    email: arg.email,
                    password: hashedPassword
                })

              const result = await  user.save();
            

              return {...result._doc,password:null,_id: result.id};

            } catch(err){
                throw err;
            }
          
              
                
            
            
           

            
        },

        bookings: async ()=>{
            
            try{
            const bookings = await  Booking.find();
            return bookings.map(booking=>getBookingData(booking))


            } catch(err){
                throw err;
            }
        },

        bookEvent: async (args)=>{

            const {  eventId } = args;

            try{
              
                const fetchedEvent = await Event.findById({_id: eventId });
            
                
                const booking = new Booking({
                    user: '5f46e4fc690ad61c089aa66d',
                    event: fetchedEvent
                });
    
                const result = await booking.save();
           
    
                return getBookingData(result);
                
            }

            catch(err){
                throw err;
            }
           
           
        },

        cancelBooking: async (args) =>{
            const { bookingsID } = args;
            console.log(bookingsID)

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

    module.exports = resolvers;