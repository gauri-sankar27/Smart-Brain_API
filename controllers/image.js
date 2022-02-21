const Clarifai = require('clarifai');
const handleImage = (req,res,db)=> {
	/*let found = false;
	const {id} = req.body;
	database.users.forEach(user => {

		if (user.id === id){
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if(!found){
		res.status(404).json("User Not Found");
	}*/
	//the returning method specifies which column should be returned by the insert, update and delete methods
	const {id} = req.body;
	 db('users').where('id','=',id).increment('entries',1)
	.returning('entries')
	.then(entries => res.json(entries[0].entries))
	.catch(err => res.json("Unable to get entries"))

}

const handleApi = (req,res) => {
	const app = new Clarifai.App({
  		apiKey: '8ae75922962f419ca440fc6d353120cf'
	})
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json("API Error"))
}
module.exports = {
	handleImage,
	handleApi
}