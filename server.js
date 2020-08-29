const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');


require('dotenv').config();


const schema = require('./graphql/schema/schema.graphql');
const resolvers = require('./graphql/resolvers/resolvers');

const app = express();

app.use(bodyParser.json());


app.use('/graphql',graphqlHTTP({
    schema,
    rootValue:resolvers,
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


