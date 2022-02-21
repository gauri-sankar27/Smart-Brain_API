const express = require('express');
// require is used to import the express module
const bodyParser = require('body-parser');
let fs = require('fs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const cors = require('cors');
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs');
const db = knex({
	  	client: 'pg',
	  	connection: {
		    host : '127.0.0.1',
		    port : 5432,
		    user : 'postgres',
		    password : 'test123',
		    database : 'smart-brain'
	  		}
	});
/*BodyParser() is to be used so that form data is made availble in req.body. Since in testing phase
we made use of postman and set the request as JSON we need to bodyparser to read it    
*/
/*
More on body parser
https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90
*/

/* READ AGAIN WHAT MIDDLESWARES ARE 
https://medium.com/@jamischarles/what-is-middleware-a-simple-explanation-bb22d6b41d01
*/


const app = express();
// app is an instance of express

app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res) => {
//app.get() routes the http GET request to the path
	//res.send("This is working");
	//res.json(database.users);
})


app.post('/signin',(req,res)=> {signin.handleSignin(req,res,db,bcrypt)});


app.post('/register',(req,res) => {register.handleRequest(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)});

app.put('/image',(req,res) => {image.handleImage(req,res,db)});
app.post('/imageUrl',(req,res) => {image.handleApi(req,res)});


app.listen(3000, () => {

	console.log('Running');

})