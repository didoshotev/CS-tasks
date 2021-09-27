const jwt = require('./jwt');
const models = require('../models');
require('dotenv').config();

const basicAuth = (req, res, next) => {

	const token = req.headers.bearer || '';

	if (!token) { return res.sendStatus(401); }

	jwt.verifyToken(token, process.env.ACCESS_TOKEN_SECRET).then(data => {

		models.User.findById(data.id)
			.then((user) => {

				req.user = user;
				next();
			})
			.catch(err => {
				next(err);
			});

	}).catch(err => {
		console.log('ERROR at token verification', err);
		next(err)
		return res.status(403);
	})
}

module.exports = { basicAuth }