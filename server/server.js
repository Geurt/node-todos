require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./models/todo');
const {User} = require('./models/user'); 

const app = express();
const port = process.env.PORT;

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

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send('Invalid ID');
	}

	Todo.findByIdAndDelete(id).then((todo) => {
		if (!todo) {
			return res.status(404).send('Todo not found');
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send('Error');
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

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectID.isValid(id)) {
		return res.status(404).send('Invalid ID');
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}


		res.send({todo});
	}).catch((e) => {
		res.status(404).send();
	});
});


app.listen(port, () => {
	console.log(`Started on port ${port}.`);
});

module.exports = {app};
