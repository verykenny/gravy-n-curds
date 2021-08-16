const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const storeRouter = require('./stores');
const poutineRouter = require('./poutines');
const checkinRouter = require('./checkins');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/stores', storeRouter);
router.use('/poutines', poutineRouter);
router.use('/checkins', checkinRouter);


module.exports = router;
