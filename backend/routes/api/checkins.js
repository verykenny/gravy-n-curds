const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');



// GET all check-ins for logged in user
router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id


    res.json({ message: 'success' });
}))


// PUT update a check-in
router.put('/:checkinId(\\d+)', asyncHandler(async (req, res) => {


    res.json({ message: 'success' });
}))



// DELETE remove a check-in
router.delete('/:checkinId(\\d+)', asyncHandler(async (req, res) => {

    res.json({ message: 'success' });
}))




module.exports = router;
