var express = require('express')
var Chat    = require('../models/chat')


var ChatsAPI = module.exports = express.Router()

ChatsAPI.get('/', function (req, res) {

  Chat.all()
    .then(function(chats) {
      res.send(chats);
    })
});

ChatsAPI.post('/', function (req, res) {

  Chat.create(req.body)
    .then(function(newChat) {
      res.status(201).send(newChat);
    })
    .catch(function(err) {
      res.status(400).send({ reason: err.message })
    })
});

//
// Example use of ChatsAPI:
//
//     var ChatsAPI = require('./apis/chats-api')
//     var app = express()
//     app.use( '/chats', ChatsAPI )
//
// This will create the following routes:
//
//     GET    /chats/
//     POST   /chats/
//     PUT    /chats/:id
//     DELETE /chats/:id
//     GET    /chats/:id/replies
