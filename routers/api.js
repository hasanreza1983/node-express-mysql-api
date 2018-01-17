//Dependencies - Express 4.x and the MySQL Connection
module.exports = (express, connection) => {
	var router = express.Router();

	// Router Middleware
	router.use((req, res, next) => {
		// log each request to the console
		console.log("You have hit the /api", req.method, req.url);

		// CORS 
		res.header("Access-Control-Allow-Origin", "*"); //TODO: potentially switch to white list version
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		// continue doing what we were doing and go to the route
		next();
	});

	// API ROOT - Display Available Routes
	router.get('/', (req, res) => {
		res.jsonp({
			name: 'AMP API',
			version: '1.0',
		});
	});

	// Customer Routes
	router.route('/customer/:id')
		.post((req, res) => {
			//specific item should not be posted to (either 404 not found or 409 conflict?)
			res.sendStatus(404);
		})
		.get((req, res) => {
			var query = connection.query('SELECT  title, fname, lname  FROM amp_user_profile WHERE id=?', [req.params.id], (err, rows, fields) => {
				if (err) {
					//INVALID
					console.error(err);
					res.sendStatus(404);
				} else {
					if (rows.length) {
						res.jsonp(rows);
					} else {
						//ID NOT FOUND
						res.sendStatus(404);
					}
				}
			});
			//console.log(query.sql);
		});


	// Country Routes
	router.route('/country/:id')
		.post((req, res) => {
			//specific item should not be posted to (either 404 not found or 409 conflict?)
			res.sendStatus(404);
		})
		.get((req, res) => {
			var query = connection.query('SELECT  country_code, country_name  FROM amp_country_master WHERE id=?', [req.params.id], (err, rows, fields) => {
				if (err) {
					//INVALID
					console.error(err);
					res.sendStatus(404);
				} else {
					if (rows.length) {
						res.jsonp(rows);
					} else {
						//ID NOT FOUND
						res.sendStatus(404);
					}
				}
			});
		});

	// City Routes
	router.route('/city/:id')
		.post((req, res) => {
			//specific item should not be posted to (either 404 not found or 409 conflict?)
			res.sendStatus(404);
		})
		.get((req, res) => {
			var query = connection.query('SELECT  city_code, city_name  FROM amp_city_master WHERE id=?', [req.params.id], (err, rows, fields) => {
				if (err) {
					//INVALID
					console.error(err);
					res.sendStatus(404);
				} else {
					if (rows.length) {
						res.jsonp(rows);
					} else {
						//ID NOT FOUND
						res.sendStatus(404);
					}
				}
			});
		});

	//end route

	return router;
};