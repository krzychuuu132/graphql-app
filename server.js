const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('dotenv').config();


const Event = require('./models/event');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());





app.use('/graphql',graphqlHTTP({
    schema:buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User {
            _id: ID!
            email: String!
            password: String
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput{
            email: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type  RootMutation{
                createEvent(eventInput: EventInput):Event
                createUser(userInput: UserInput) : User
        }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue:{
        events:()=>{
           return Event.find()
            .then(events=> {
                events.forEach(event=>event)
            })
            .catch(err=>{
                throw err;
            })
        },
        createEvent:(args)=>{
             const { eventInput: arg }  = args;
             
                const event = new Event({
                    title: arg.title,
                    description: arg.description,
                    price: arg.price,
                    date: new Date(arg.date)
                });
                let createdEvent;
                return event
                .save()
                .then(result=>{
                    createdEvent = {...result._doc};
                      return  User.findById('5f46e4fc690ad61c089aa66d')
                        console.log(result);
                     
                    })
                    .then(user=>{
                        if(!user) {
                            throw new Error('User not found')
                        }

                        user.createdEvents.push(event);
                        return user.save();
                    })
                    .then(result=>{
                        return createdEvent;
                    })
                .catch(err=>{
                        console.log(err);
                        throw err;
                    })
               
                
                
           
                return event
        },
        createUser:(args)=>{
           

            const { userInput: arg } = args;

           return  User.findOne({email: arg.email}).then(user=>{
                 if(user) {
                     throw new Error('User already exists')
                 }
                 return bcrypt.hash(arg.password, 12);
             })
            .then(hashedPassword=>{

                const user = new User({
                    email: arg.email,
                    password: hashedPassword
                })

              return  user.save();

            })
            .then(result=>{
                console.log(result._doc);
                return {...result._doc,password:null,_id: result.id};
            })
            
            .catch(err=>{
                throw err;
            })

            
        }
    },
    graphiql: true
}))

mongoose.connect(process.env.DB_CONNECTION ,{ useNewUrlParser: true },()=>{
    console.log("connected to DB!")
})
.then(()=>{
app.listen(process.env.PORT||3000,()=>console.log('Server has been run!'));
})
.catch(err=>{
    console.log(err)
})


