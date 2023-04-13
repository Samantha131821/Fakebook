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




router.get('/profile/:id', (req, res) => {
  console.log('======================');
  console.log(req.session.user_id);

  User.findAll({
      attributes: ['user_name', 'profile_picture', 'hometown', 'email', 'birthday', 'bio'],
      where: { user_id: req.params.id},
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
        res.render('friendsProfile', { ...allUserData[0], logged_in: req.session.logged_in });

      })
      
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

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
