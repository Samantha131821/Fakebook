const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');



router.get('/', withAuth, (req, res) => {
  console.log('======================');
  Post.findAll({
      attributes: [
        'post_id',
          'date_created',
          'post_content'
      ],
    order: [['date_created', 'DESC']],
    where: { user_id: 1 },
    include: [
      // Comment model here -- attached username to comment
      {
        model: Comment,
        attributes: ['comment_content', 'date_created'],
        include: { 
          model: User, 
          attributes: ['user_name'],
          
        }
      },
      {
        model: User,
        attributes: ['user_name', 'hometown', 'email', 'birthday']

      },

    ]
  })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        
        res.render('profile', {...posts, logged_in: req.session.logged_in });

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

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
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
