const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Store, Poutine } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// GET retrieve all poutines
router.get('/', asyncHandler(async (req, res) => {
    const poutines = await Poutine.findAll();

    res.json({ poutines })
}))


// GET check-ins for a poutine dish
router.get('/:poutineId(\\d+)/checkins', asyncHandler(async (req, res) => {


    res.json({ message: 'success' });
}))


// POST create a check-in for a poutine dish
router.post('/:poutineId(\\d+)/checkins', asyncHandler(async (req, res) => {


    res.json({ message: 'success' });
}))



// PUT update a poutine
router.put('/:poutineId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const { name, imageUrl, description } = req.body;
    const poutineId = Number(req.params.poutineId);
    const userId = req.user.id;

    const poutine = await Poutine.findByPk(poutineId, {
        include: Store
    })

    if (poutine.Store.ownerId !== userId) return res.json({ message: 'unauthorized' })

    poutine.name = name;
    poutine.imageUrl = imageUrl;
    poutine.description = description;
    await poutine.save();


    res.json({ poutine })
}))


// DELETE remove a poutine
router.delete('/:poutineId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const poutineId = Number(req.params.poutineId);
    const userId = req.user.id;

    const poutine = await Poutine.findByPk(poutineId, {
        include: Store
    });

    if (poutine.Store.ownerId !== userId) return res.json({ message: 'unauthorized' })

    await poutine.destroy();

    res.json({ message: 'success' })
}))


module.exports = router;
