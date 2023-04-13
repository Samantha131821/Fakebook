const router = require('express').Router();
const { Post, User, Comment, Following } = require('../models');
const withAuth = require('../utils/auth');



router.get('/', withAuth, (req, res) => {
  console.log('======================');
  console.log(req.session.user_id);

  User.findAll({
      attributes: ['user_name', 'profile_picture', 'hometown', 'email', 'birthday', 'bio'],
      where: { user_id: req.session.user_id},
      include: [
      {
        model: Post,
        attributes: ['post_id', 'post_content', 'date_created'],
        order: ['date_created', 'DESC'],
        include: { 
          model: Comment, 
          attributes: ['comment_id', 'comment_content', 'user_id'],
          order: ['date_created', 'DESC'],
        }
       },
       {
        model: Following,
        attributes: [ 'followee_id', 'date_followed'],
        order: ['date_followed', 'DESC'],
        include: { 
          model: User, 
          attributes: ['user_name']
        }
       }

     ]
  })
    .then(dbAllData => {
        const allUserData = dbAllData.map(post => post.get({ plain: true }));
        //const allPostData = allUserData[0].map(post => post.get({ plain: true }));
        console.log('===========*|*===========');
        console.log('Followers???: ', allUserData[0].followings);
        console.log(allUserData[0].posts[0]);
        //console.log(dbPostData);
        console.log('===========*|*===========');

        console.log('.map response: ', allUserData[0]);
        res.render('profile', { ...allUserData[0], logged_in: req.session.logged_in });

      })
      
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  });










// router.get('/', async (req, res) => {
//   try {
//     const postData = await Post.findAll();
//     const posts = postData.map((post) => post.get({ plain: true }));

//     res.render('profile', {posts});
//       console.log('||||- ! -||||', posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });





// router.get('/', async (req, res) => {
//   try {
//     // Get all posts and JOIN with user data
//     const postData = await Post.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const posts = postData.map((project) => post.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       posts, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {...post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    console.log('sesstion id? :', req.session);
    
    const userData = await User.findByPk(req.session.user_id, { attributes: { exclude: ['password'] }, include: [{ model: Project }], });
    
    console.log('==============   userData id? ============= :', userData);

    const user = userData.get({ plain: true });
    console.log('==============   userData id? ============= :', user);
    res.render('profile', { ...user, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
