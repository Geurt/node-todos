var env = process.env.NODE_ENV || 'development'; // set in package.json test script or by heroku

if (env === 'development') {
	process.env.PORT = 3000;
	// mongodb atlas:
	// process.env.MONGODB_URI = 'mongodb+srv://grsengers:unoriginal79@geurt-test-shgnm.mongodb.net/test?retryWrites=true'
	// local:
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
} else if (env === 'test') {
	process.env.PORT = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'; // separate test DB
}
