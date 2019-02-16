const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (e) => {
	if (e) {
		console.log(e);
	}
});

module.exports = {mongoose};
