const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
require('dotenv').config();
const Event = require('./models/event');

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

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type  RootMutation{
                createEvent(eventInput: EventInput):Event
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
                return event
                .save()
                .then(result=>{
                        console.log(result);
                        return {...result._doc};
                    })
                .catch(err=>{
                        console.log(err);
                        throw err;
                    })
               
                
                
           
                return event
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


