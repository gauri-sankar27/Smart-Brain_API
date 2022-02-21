const handleSignin = (req,res,db,bcrypt) => {
	const {email,password} = req.body;
	if(!email || !password){
		//This is to prevent empty fields in signin form
		return res.status(400).json("Invalid form submission")
	}
	db.select('email','hash').from('login')
	.where('email','=',email)
	.then(data => {
		const isValid = bcrypt.compareSync(password,data[0].hash);
		
		if(isValid){
			db.select('*').from('users')
			.where({email:email})
			.then(user => {
				res.json(user[0])
			})
			.catch(err => res.status(400).json("Unable to get user"))
		}else {
			res.status(400).json('Invaid credentials');
		}
	})
	.catch(err => res.json("Invaid credentials"))

}
module.exports = {
	handleSignin : handleSignin
}