const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

var id = "5c62e16b7bafca6c1e209b9b";
var user_id = "5c618ec89187c9372c2b5081";

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log(todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log(todo);
// });

Todo.findById(id).then((todo) => {
	if (!todo) {
		return console.log('ID not found');
	}
	console.log(todo);
}).catch((e) => console.log(e));

User.findById(user_id).then((user) => {
	if (!user) {
		return console.log('ID not found');
	}
	console.log(user);
}).catch((e) => console.log(e));
