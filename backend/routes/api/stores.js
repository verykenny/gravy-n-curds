const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Store, Poutine } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validatePoutine, validateStore } = require('../../utils/validation');


// GET retrieve all stores
router.get('/', asyncHandler(async (req, res) => {
    const stores = await Store.findAll({
        include: Poutine
    });
    return res.json({ stores });
}))

// GET retrieve all poutine for a store
// router.get('/:storeId(\\d+)/poutines', asyncHandler(async (req, res) => {
//     const storeId = Number(req.params.storeId);

//     const poutines = await Poutine.findAll({
//         include: {
//             model: Store,
//             where: {
//                 id: storeId
//             }
//         }
//     })

//     return res.json({ poutines })
// }))


// POST add a new store
router.post('/', requireAuth, validateStore, asyncHandler(async (req, res) => {
    const { name, imageUrl } = req.body;
    const ownerId = req.user.id;

    const store = await Store.create({
        ownerId,
        name,
        imageUrl,
    });

    return res.json({ store });
}));


// POST add new poutine to a store
router.post('/:storeId(\\d+)/poutines', requireAuth, validatePoutine, asyncHandler(async (req, res) => {
    const { name, imageUrl, description } = req.body;
    const storeId  = Number(req.params.storeId);
    const userId = req.user.id;
    const store = await Store.findByPk(storeId);


    if (userId !== store.ownerId) return res.json({ message: 'unauthorized' })

    const poutine = await Poutine.create({
        storeId,
        name,
        imageUrl,
        description
    })


    res.json({ poutine })
}))


// PUT update a store
router.put('/:storeId(\\d+)', requireAuth, validateStore, asyncHandler(async (req, res) => {
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
