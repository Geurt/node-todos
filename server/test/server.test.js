const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var todos = [{
	text: "A todo."
}, {
	text: "Another todo."
}];

beforeEach((done) => {
	// runs before each test case
	// only proceeds after done() is called
	// empty the database:
	Todo.deleteMany({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done()); // expression syntax
});

describe('POST /todo', () => {	// neatly organise in describe sections
	it('should create a new todo', (done) => {	// async test, so use done
		var text = 'A test string';
		
		request(app)	// post server using supertest
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => { // here instead of done, we add a callback for a further test
				if (err) {
					return done(err);
				}

				// let's see if the todo actually got into the model
				Todo.find({text: 'A test string'}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();	// wrap up test
				}).catch((e) => done(e)); 
				// IMPORTANT: catch and pass error into done, otherwise test would never fail
			});

	});

	it('should not create a todo with invalid data', (done) => {
		var text = '';

		request(app)
			.post('/todos')
			.send({text})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((e) => done(e));
			})
	});
});

describe('GET /todos', () => {
	it('should return a list of todos', (done) => {
		request(app)
			.get('/todos')
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});
});
