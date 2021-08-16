const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const storeRouter = require('./stores');
const poutineRouter = require('./poutines');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/stores', storeRouter);
router.use('/poutines', poutineRouter);


module.exports = router;
