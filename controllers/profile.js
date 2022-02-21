const handleProfileGet = (req,res,db) => {
	/*let found = false;
	const {id} = req.params;
	database.users.forEach(user => {

		if (user.id === id){
			found = true;
			return res.json(user);
		}
	})
	if(!found){
		res.status(404).json("User Not Found");
	}*/
	const {id} = req.params;
	db.select('*').from('users').where({id})
	.then(user => {
		if(user.length){
			res.json(user);
		}else {
			res.json("No user found");
		}
	})
	.catch(err => res.status(400).json('Error in fetching user'))

}

module.exports = {
	handleProfileGet
}