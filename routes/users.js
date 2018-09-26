const { User, Validate } = require('../models/user');
const bcryptjs = require('bcryptjs');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/',async (req,res) => {
    const { error } = Validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email : req.body.email});
    if(user) return res.status(400).send('User already registerd');

    user = new User(_.pick(req.body,['name','email','password']));

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);

    await user.save();
    res.send(_.pick(user,['_id','name','email']));
});

module.exports = router;