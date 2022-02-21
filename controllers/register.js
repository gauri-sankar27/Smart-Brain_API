const handleRequest = (req,res,db,bcrypt) => {
	const {name,password,email} = req.body;
	if(!email || !password || !name){
		//This is to prevent empty fields in register form
		return res.status(400).json("Invalid form submission")
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			// returning returns an array object 
			trx('users')
				.returning('*')
				.insert({
					name:name,
					email:loginEmail[0].email,
					joined:new Date()
				})
				.then(user => {
					res.json(user[0]);
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch( err => res.status(400).json("Unable to register user"));
	//NOTE always have a response or else there will be an error
}
module.exports = {
	handleRequest
}