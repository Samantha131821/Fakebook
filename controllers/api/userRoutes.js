const router = require('express').Router();
const { User } = require('../../models');

//creating a new user
router.post('/', async (req, res) => {
  try {console.log(req.body);
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {console.log(err);
    res.status(400).json(err);
  }
});

//logging in
router.post('/login', async (req, res) => {
  try {
    console.log('user login post route', req.body);
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log('userData: ', userData);
    if (!userData) {
      res
        .status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.user_id; //fixed session.user_id issue
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//loging out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// GET Route for all users list
router.get('/all', (req, res) =>{
 
  User.findAll()
  .then((data) => {
    const users = data.map(post => post.get({ plain: true }));
    console.log('User data: ', users);
    res.render('friends', {users,});
  });
});


module.exports = router;
