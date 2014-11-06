// config/database.js]

var mongo_uri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017';
module.exports = {

	'url' : mongo_uri// looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};
