const router = require('express').Router();
const asyncHandler = require('express-async-handler');

// PUT update a check-in
router.put('/:checkinId(\\d+)', asyncHandler(async (req, res) => {


    res.json({ message: 'success' });
}))



// DELETE remove a check-in
router.delete('/:checkinId(\\d+)', asyncHandler(async (req, res) => {

    res.json({ message: 'success' });
}))




module.exports = router;
