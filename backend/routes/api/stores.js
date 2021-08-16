const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Store } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


// GET retrieve all stores
router.get('/', asyncHandler(async (req, res) => {
    const stores = await Store.findAll();
    return res.json({ stores });
}))


// POST add a new store
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { name, imageUrl } = req.body;
    const ownerId = req.user.id;

    const store = await Store.create({
        ownerId,
        name,
        imageUrl,
    });

    return res.json({ store });
}))


// PUT update a store
router.put('/:storeId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const { name, imageUrl } = req.body;
    const storeId  = Number(req.params.storeId);

    const userId = req.user.id;


    const store = await Store.findByPk(storeId);

    if (userId !== store.ownerId) return res.json({ message: 'unauthorized' })

    store.name = name;
    store.imageUrl = imageUrl;
    await store.save();

    return res.json({ store });
}))


// DELETE remove a store
router.delete('/:storeId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const storeId  = Number(req.params.storeId);

    const store = await Store.findByPk(storeId);
    await store.destroy();

    return res.json({ message: 'success' });
}))



module.exports = router;
