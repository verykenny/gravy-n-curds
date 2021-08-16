const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');

const { Checkin } = require('../../db/models');



// GET all check-ins
router.get('/', asyncHandler(async (req, res) => {

    const checkins = await Checkin.findAll();

    res.json({ checkins });
}))


// PUT update a check-in
router.put('/:checkinId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const { comment, rating } = req.body;
    const checkinId = Number(req.params.checkinId);
    const userId = req.user.id;

    const checkin = await Checkin.findByPk(checkinId);

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
