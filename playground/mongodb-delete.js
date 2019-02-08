const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		return console.log('Could not connect to MongoDB server.');
	}
	console.log('Connected to MongoDB server.')

	const db = client.db('TodoApp');

	// deleteMany
	// db.collection('Todos').deleteMany({text: 'Have lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// deleteOne
	// db.collection('Todos').deleteOne({text: 'Have lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// findOneAndDelete
	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result);
	// });

	// delete duplicates
	db.collection('Users').find().toArray().then((docs) => {
		docs.forEach((doc) => {
			var count = db.collection('Users')
				.find({name: doc.name})
				.count()
				.then((count) => {			
					if (count > 1) {
						db.collection('Users')
							.deleteMany({name: doc.name})
							.then((result) => {console.log(result)});
					}
				});
		});
	});


	// client.close();
});