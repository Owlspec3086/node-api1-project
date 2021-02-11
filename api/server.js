// BUILD YOUR SERVER HERE
const express = require('express');
const shortid = require('shortid');
const bodyparser = require('body-parser');

const server = express();

server.use(bodyparser.json());

let users = [
  {
    id: shortid.generate(),
    name: 'Ed Carter',
    bio: 'Hero',
  },
  {
    id: shortid.generate(),
    name: 'Mary Edwards',
    bio: 'Super hero',
  },
];

//Testing to make sure welcome route works: Check
server.get('/', (req, res) => {
  res.status(200).json({
    Welcome:
      'Owlspec3086, Please proceed to test you API at appDevelopmentpad technology!',
  });
});

//POST Users
server.post('/api/users', (req, res) => {
  const { name, bio } = require.body;

  if (!name || !bio) {
    return res
      .status(400)
      .json({ message: 'Please provide name and bio for the user' });
  }
  if (users.find((user) => user, name === name)) {
    return (500).json({
      message: 'There was an error while saving the user to the database',
    });
  }
  const users = { id: shortid.generate(), name, bio };
  users.push(users);
  res.status(201).send(users);
});

//Get users
server.get('/api/users', (req, res) => {
  if (!req)
    res
      .status(500)
      .json({ message: 'The users information could not be retrieved' });
  res.send(users);
});

//Get usersById
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (!id) {
    return res
      .status(500)
      .json({ message: 'The user information could not be retrieved.' });
  }
  if (!user) {
    return res
      .status(404)
      .json({ mesage: 'The user with the specified ID doesn not exist.' });
  }

  res.status(200).send(user);
});
//delete request
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist.' });
  }
  users = users.filter((user) => user.id !== id);

  if (users.find((user) => user.id === id)) {
    return res.status(500).json({ message: 'The user could not be removed' });
  }

  res.status(200).send(user);
});

//Update Users
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const newUserInfo = req.body;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist.' });
  }

  if (!newUserInfo.bio || !newUserInfo.name) {
    return res
      .status(400)
      .json({ error: 'Please provide name and bio for the user' });
  }

  user.name = newUserInfo.name;
  user.bio = newUserInfo.bio;

  if (user.name !== newUserInfo.name || user.bio !== newUserInfo.bio) {
    return res
      .status(500)
      .json({ errorMessage: 'The user information could not be modified.' });
  }

  res.status(200).send(user);
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
