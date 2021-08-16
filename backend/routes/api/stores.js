const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Store } = require('../../db/models');


// GET retrieve all stores
router.get('/', asyncHandler(async (req, res) => {
    const stores = await Store.findAll();
    return res.json({ stores });
}))


// POST add a new store
router.post('/', asyncHandler(async (req, res) => {
    const { ownerId, name, imageUrl } = req.body;
    return res.json({ message: 'good to go' });
}))


// PUT update a store
router.put('/:storeId(\\d+)', asyncHandler(async (req, res) => {
    const storeId  = Number(req.params.storeId)
    return res.json({ message: storeId });
}))


// DELETE remove a store
router.delete('/:storeId(\\d+)', asyncHandler(async (req, res) => {
    const storeId  = Number(req.params.storeId)
    return res.json({ message: storeId });
}))



module.exports = router;
