const router = require('express').Router();
const Users = require("../models/User");
const bcrypt = require('bcrypt');



//REGISTER
router.post('/resgister', async (req, res) => {
   

   try {
         // generate new password
    const salt = await bcript.genSalt(10);
    const hashedPassword = await bcript.hash(req.body.password, salt)

    const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

       //save responds
      const user = await newUser.save();
      const { password, ...others } = user._doc
      res.status(200).json(others)
   } catch (err) {
    res.status(500).json(err)
   }
})


//LOGIN
router.post('/login', async (req, res) => {
    try{
        const user = await Users.findOne({ email: req.body.email });
        !user && res.status(404).json('user not found');

        const validpassword = await bcript.compare(req.body.password, user.password);
        !validpassword && res.status(400).json('wrong password');

        res.status(200).json(user)
    } catch (err) {
       res.status(500).json(err)
    }
    
});

module.exports = router;