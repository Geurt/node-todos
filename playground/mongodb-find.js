const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		return console.log('Could not connect to MongoDB server.');
	}
	console.log('Connected to MongoDB server.')

	const db = client.db('TodoApp');

	// db.collection('Todos').find({
	// 	_id: new ObjectID('5c5d837d0d41104b54b2f7aa')
	// }).toArray().then((docs) => {
	// 	console.log('Todos:');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Could not find documents.', err);
	// });

	// db.collection('Todos').find().count().then((count) => {
	// 	console.log(`Todos count: ${count}`);
	// }, (err) => {
	// 	console.log(err);
	// });

	db.collection('Users').find({name: 'Geurt Sengers'}).toArray().then((docs) => {
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log(err);
	});

	// client.close();
});