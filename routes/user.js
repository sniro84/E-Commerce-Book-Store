const express = require('express');
const router = express.Router();

const { userById } = require('../controllers/user');
const { requireSignin , isAuth , isAdmin } = require('../controllers/auth');

router.param('userId' , userById);

router.get("/secret/:userId" , requireSignin , isAuth, isAdmin , (req, res) => {
    res.json({ user: req.profile});
});


module.exports = router;