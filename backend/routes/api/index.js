const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const storeRouter = require('./stores');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/stores', storeRouter);


module.exports = router;
