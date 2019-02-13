const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./models/todo');
const {User} = require('./models/user'); 

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save(todo).then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});

});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos}); // more flexible to create an object than the mere array
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	// validate id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send('Invalid ID');
	}

	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(404).send('Todo not found.');
		}
		
		res.send({todo}); // todo as property is more flexible 
	}).catch((e) => {
		res.status(400).send('Error');
	});

});

app.listen(3000, () => {
	console.log('Started on port 3000.');
});

module.exports = {app};
