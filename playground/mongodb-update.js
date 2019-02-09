const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		return console.log('Could not connect to MongoDB server.');
	}
	console.log('Connected to MongoDB server.')

	const db = client.db('TodoApp');

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5c5d72ef19e6ceec856d3250')
	}, {
		$inc: {age: 1}
	}, {
		returnNewDocument: true
	})

	// client.close();
});