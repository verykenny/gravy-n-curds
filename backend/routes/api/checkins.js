const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');

const { Checkin, User, Poutine, Store } = require('../../db/models');
const { validateCheckin } = require('../../utils/validation');



// GET all check-ins
router.get('/', asyncHandler(async (req, res) => {

    const checkins = await Checkin.findAll({
        include: [{
            model: Poutine,
            include: Store
        },{
            model: User
        }]
    });

    res.json({ checkins });
}))


// PUT update a check-in
router.put('/:checkinId(\\d+)', requireAuth, validateCheckin, asyncHandler(async (req, res) => {
    const { comment, rating } = req.body;
    const checkinId = Number(req.params.checkinId);
    const userId = req.user.id;

    const checkin = await Checkin.findByPk(checkinId, {
        include: {
            model: Poutine,
            include: Store
        }
    });

    if (userId !== checkin.userId) return res.json({ message: 'unauthorized' })

    checkin.comment = comment;
    checkin.rating = rating;
    await checkin.save();

    res.json({ checkin });
}))



// DELETE remove a check-in
router.delete('/:checkinId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const checkinId = Number(req.params.checkinId);
    const userId = req.user.id;

    const checkin = await Checkin.findByPk(checkinId);

    if (userId !== checkin.userId) return res.json({ message: 'unauthorized' })

    await checkin.destroy();

    res.json({ message: 'success' });
}))




module.exports = router;
