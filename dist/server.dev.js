"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var bodyParser = require('body-parser');

var _require = require('express-graphql'),
    graphqlHTTP = _require.graphqlHTTP;

var _require2 = require('graphql'),
    buildSchema = _require2.buildSchema;

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

require('dotenv').config();

var Event = require('./models/event');

var User = require('./models/user');

var app = express();
app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
  schema: buildSchema("\n        type Event {\n            _id: ID!\n            title: String!\n            description: String!\n            price: Float!\n            date: String!\n        }\n\n        type User {\n            _id: ID!\n            email: String!\n            password: String\n        }\n\n        input EventInput {\n            title: String!\n            description: String!\n            price: Float!\n            date: String!\n        }\n\n        input UserInput{\n            email: String!\n            password: String!\n        }\n\n        type RootQuery {\n            events: [Event!]!\n        }\n\n        type  RootMutation{\n                createEvent(eventInput: EventInput):Event\n                createUser(userInput: UserInput) : User\n        }\n\n    schema {\n        query: RootQuery\n        mutation: RootMutation\n    }\n    "),
  rootValue: {
    events: function events() {
      return Event.find().then(function (events) {
        events.forEach(function (event) {
          return event;
        });
      })["catch"](function (err) {
        throw err;
      });
    },
    createEvent: function createEvent(args) {
      var arg = args.eventInput;
      var event = new Event({
        title: arg.title,
        description: arg.description,
        price: arg.price,
        date: new Date(arg.date)
      });
      var createdEvent;
      return event.save().then(function (result) {
        createdEvent = _objectSpread({}, result._doc);
        return User.findById('5f46e4fc690ad61c089aa66d');
        console.log(result);
      }).then(function (user) {
        if (!user) {
          throw new Error('User not found');
        }

        user.createdEvents.push(event);
        return user.save();
      }).then(function (result) {
        return createdEvent;
      })["catch"](function (err) {
        console.log(err);
        throw err;
      });
      return event;
    },
    createUser: function createUser(args) {
      var arg = args.userInput;
      return User.findOne({
        email: arg.email
      }).then(function (user) {
        if (user) {
          throw new Error('User already exists');
        }

        return bcrypt.hash(arg.password, 12);
      }).then(function (hashedPassword) {
        var user = new User({
          email: arg.email,
          password: hashedPassword
        });
        return user.save();
      }).then(function (result) {
        console.log(result._doc);
        return _objectSpread({}, result._doc, {
          password: null,
          _id: result.id
        });
      })["catch"](function (err) {
        throw err;
      });
    }
  },
  graphiql: true
}));
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true
}, function () {
  console.log("connected to DB!");
}).then(function () {
  app.listen(process.env.PORT || 3000, function () {
    return console.log('Server has been run!');
  });
})["catch"](function (err) {
  console.log(err);
});