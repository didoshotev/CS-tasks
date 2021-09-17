const jwt = require('./jwt');
const models = require('../models');
require('dotenv').config();
const USER_MANAGER_TYPE = 'manager';
const USER_STANDART_TYPE = 'standart';

const basicAuth = (req, res, next) => {

  const token = req.headers.bearer || '';

  if (!token) { return res.sendStatus(401); }

  jwt.verifyToken(token, process.env.ACCESS_TOKEN_SECRET).then(data => {

    models.User.findById(data.id)
      .then((user) => {
        req.user = user;
        next();
      }).catch(err => {
        next(err);
      });

  }).catch(err => {
    console.log('ERROR at token verification', err);
    next(err)
    return res.status(403);
  })
}

const managerCheck = (req, res, next) => { 
  const token        = req.headers.bearer || '';
  const decodedToken = jwt.decodeToken(token)
  const isManager    = decodedToken.type === USER_MANAGER_TYPE

  if(!isManager) { return res.sendStatus(401)}
  
  next();
}

const standartCheck = (req, res, next) => { 
  const token        = req.headers.bearer || '';
  const decodedToken = jwt.decodeToken(token)
  const isAtleastStandart   = 
  decodedToken.type === USER_STANDART_TYPE || decodedToken.type === USER_MANAGER_TYPE;

  if(!isAtleastStandart) { return res.sendStatus(401)}
  next();
}

module.exports = { basicAuth, managerCheck, standartCheck }