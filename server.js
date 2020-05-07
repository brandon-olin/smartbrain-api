const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex')

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_URL,
    ssl: true
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('It is working!') })

app.post('/signin', signIn.handleSignIn(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3001, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})
