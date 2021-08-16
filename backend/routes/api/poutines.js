const router = require('express').Router();
const asyncHandler = require('express-async-handler');

// GET retrieve all poutines
router.get('/', asyncHandler(async (req, res) => {

    res.json({ message: 'success' })
}))





// PUT update a poutine
router.put('/:poutineId(\\d+)', asyncHandler(async (req, res) => {

    res.json({ message: 'success' })
}))


// DELETE remove a poutine
router.delete('/:poutineId(\\d+)', asyncHandler(async (req, res) => {

    res.json({ message: 'success' })
}))


module.exports = router;
