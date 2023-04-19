const router = require('express').Router();
const { Post, User, Comment, Following } = require('../models');
const withAuth = require('../utils/auth');



router.get('/profile/:id', withAuth, (req, res) => {
  console.log('=========== HOMEROUTE DB QUERY RESPONSE ===========');
  console.log('Logged in as user ID# ', req.session.user_id);

  User.findAll({
    attributes: ['user_id', 'user_name', 'profile_picture', 'hometown', 'email', 'birthday', 'bio', 'theme'],
    where: { user_id: req.params.id },
    include: [
      {
        model: Post,
        attributes: ['post_id', 'post_content', 'date_created'],
        order: ['date_created', 'DESC'],
        include: {
          model: Comment,
          attributes: ['comment_id', 'comment_content', 'user_id', 'date_created'],
          order: ['date_created', 'DESC'],
          include: {
            model: User,
            attributes: ['user_name'],
          }
        }
      },
      {
        model: Following,
        attributes: ['followee_id', 'followee_name', 'date_followed', 'profile_picture'],
        order: ['date_followed', 'DESC'],
        // include: { //THIS IS WHAT I WANT!!!
        //   model: User, 
        //   attributes: ['user_name'] //AT THE MOMENT I GET FOLLOWER NAME
        // }
      }
    ]
  })
    .then(dbAllData => {
      const allUserData = dbAllData.map(post => post.get({ plain: true }));
      console.log('===========*.map response*===========');
      console.log('USER INFO AT ARRAY [0]: ', allUserData[0]);
      if (allUserData[0].user_id === req.session.user_id) {
        allUserData[0].owner = true;
        allUserData[0].followBtn = false;
        allUserData[0].posts.forEach((post) => {
          post.comments.forEach((comment) => {
            comment.comment_owner = true
          })
        });

      } else {
        allUserData[0].followBtn = true;
        allUserData[0].posts.forEach((post) => {
          post.comments.forEach((comment) => {
            if (comment.user_id === req.session.user_id) {
              comment.comment_owner = true;
            };
          })
        });
      }
      // console.log(allUserData[0]);

      // console.log('===========* USER POSTS *===========');
      // console.log(allUserData[0].posts);

      // console.log('===========* FOLLOWERS *===========');
      console.log('Followers: ', JSON.stringify(allUserData[0]));



      res.render('profile', { ...allUserData[0], logged_in: req.session.logged_in, userInfo: JSON.stringify(allUserData[0]) });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});


router.get('/', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect(`/profile/${req.session.user_id}`);
    return;
  }

  res.render('login');
});

module.exports = router;

