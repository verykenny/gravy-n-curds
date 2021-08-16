const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');

const { Checkin } = require('../../db/models');



// GET all check-ins for logged in user
router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    
    const checkins = await Checkin.findAll({
        where: {
            userId: userId
        }
    })

    res.json({ checkins });
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
