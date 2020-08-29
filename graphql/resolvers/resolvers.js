const Event = require('../../models/event');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');  

const { user,events } = require('../utililties/functions')


const resolvers = {
   events:async ()=>{
          
       
             try{
                    const events = await Event.find();

                    return events.map(event =>{
                   
                    return {
                    ...event._doc,
                    date: new Date(event._doc.date).toISOString(),
                    _id: event.id,
                    creator: user.bind(this,event.creator)
                }

                });
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
                    date: new Date(arg.date),
                    creator: '5f46e4fc690ad61c089aa66d'
                });
                let createdEvent;

                const result = await event.save();
               
                    createdEvent = {
                        ...result._doc,
                        date: new Date(result._doc.date).toISOString(),
                        creator:user.bind(this,result.creator)
                    };
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
          
              
                
            
            
           

            
        }
    }

    module.exports = resolvers;