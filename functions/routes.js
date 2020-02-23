const express = require('express');
const router = express.Router();
const {addUser, getUsers} = require('./handlers/users');
const {login,me} = require('./handlers/auth')
const midAuth = require ('./middleware/midAuth')
const midAdmin = require ('./middleware/midAdmin')
const {addBalita, getBalita, delBalita,searchBalita} = require('./handlers/balita')

//router users
router.post('/users',addUser);
router.get('/users',midAuth,getUsers);
router.get('/auth/me',midAuth,midAdmin,me);
router.post('/auth',login);

//router balita
router.post('/balita',midAuth,addBalita);
router.delete('/balita/:id',delBalita)
router.get('/balita',midAuth,midAdmin,getBalita)
router.get('/balita/search/:id',midAuth,searchBalita)

module.exports = router;