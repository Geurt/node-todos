const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// local
// mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

// mongodb atlas
mongoose.connect('mongodb+srv://grsengers:helmut79@geurt-test-shgnm.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

// mlab heroku
// mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};
