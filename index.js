// Import express
let express = require('express');

// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

// Setup server port
var PORT = process.env.PORT || 8080;
var HOST = process.env.HOST || "pierretoure-fimaapi.zeet.app";

// Setup swagger
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
	swaggerDefinition: {
		info: {
			title: 'Fima api',
			version: '1.0.0',
		},
		host: HOST === 'localhost' || HOST === '0.0.0.0'
			? `${HOST}:${PORT}`
			: HOST,
	},
	apis: ['./api-routes.js', './swagger.yml'],
};

const swaggerSpecification = swaggerJsdoc(options);

app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', swaggerUi.setup(swaggerSpecification));

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
var dbUri = process.env.FIMA_DB_URI;
if (!dbUri) {
	const config = require('config-yml');
	dbUri = config.db.uri
}
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port

app.listen(PORT, function () {
    console.log("Running FimaApi on port " + PORT);
});