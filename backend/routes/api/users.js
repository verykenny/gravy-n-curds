const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateSignup } = require('../../utils/validation');



const router = express.Router();


// Sign up
router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
        user,
    });
}));

// GET all check-ins for a user
router.get('/:userId(\\d+)/checkins', asyncHandler(async (req, res) => {
    const userId = Number(req.params.userId);

    const checkins = await Checkin.findAll({
        where: {
            userId: userId
        }
    })

    res.json({ checkins });
}))


module.exports = router;
