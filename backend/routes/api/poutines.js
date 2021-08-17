const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Store, Poutine, Checkin, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validatePoutine } = require('../../utils/validation');

// GET retrieve all poutines
router.get('/', asyncHandler(async (req, res) => {
    const poutines = await Poutine.findAll({
        include: {
            model: Checkin,
            include: User
        }
    });

    res.json({ poutines })
}))


// GET check-ins for a poutine dish
// router.get('/:poutineId(\\d+)/checkins', asyncHandler(async (req, res) => {
//     const poutineId = Number(req.params.poutineId);

//     const checkins = await Checkin.findAll({
//         where: {
//             poutineId: poutineId
//         }
//     })

//     res.json({ checkins });
// }))


// POST create a check-in for a poutine dish
router.post('/:poutineId(\\d+)/checkins', requireAuth, asyncHandler(async (req, res) => {
    const { comment, rating } = req.body;
    const userId = req.user.id;
    const poutineId = Number(req.params.poutineId);

    const checkin = await Checkin.create({
        userId,
        poutineId,
        comment,
        rating
    });

    res.json({ checkin });
}))



// PUT update a poutine
router.put('/:poutineId(\\d+)', requireAuth, validatePoutine, asyncHandler(async (req, res) => {
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
