const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('hello Node!')
})


app.listen(process.env.PORT||3000,()=>console.log('Server has been run!'))