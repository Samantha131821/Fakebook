const { Op } = require("sequelize");
const router = require('express').Router();
const { Post, User, Comment, Following } = require('../models');
const withAuth = require('../utils/auth');


// router.get('/profile/:id', withAuth, (req, res) => {
//   console.log('======================');
//   console.log(req.session.user_id);

//   User.findAll({
//     attributes: ['user_id', 'user_name', 'profile_picture', 'hometown', 'email', 'birthday', 'bio'],
//     where: { user_id: req.params.id },
//     include: [
//       {
//         model: Post,
//         attributes: ['post_id', 'post_content', 'date_created'],
//         order: ['date_created', 'DESC'],
//         include: {
//           model: Comment,
//           attributes: ['comment_id', 'comment_content', 'user_id'],
//           order: ['date_created', 'DESC'],
//         }
//       },
//       {
//         model: Following,
//         attributes: ['followee_id', 'followee_name', 'date_followed'],
//         order: ['date_followed', 'DESC'],
//         // include: { 
//         //   model: User, 
//         //   attributes: ['user_name']
//         // }
//       }

//     ]
//   })
//     .then(dbAllData => {
//       const allUserData = dbAllData.map(post => post.get({ plain: true }));
//       console.log('===========* FRIENDS .map response *===========');
//       console.log('USER INFO AT ARRAY [0]: ', allUserData[0]);

//       console.log('===========* FRIENDS USER POSTS *===========');
//       console.log(allUserData[0].posts[0]);

//       console.log('===========* FRIENDS FOLLOWERS *===========');
//       console.log('Followers: ', allUserData[0].followings);

//       console.log('Friends REQ.SESSION.LOGGED_IN: ', req.session);

//       res.render('friendsProfile', { ...allUserData[0], logged_in: req.session.logged_in, logged_in_id: req.session.user_id });
//     })

//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


//New follower entry gets crated if does not exist
router.post('/follow', withAuth, async (req, res) => {
  console.log('req.body', req.body);
  console.log('req.session', req.session.user_id);
  try {
    const newFollowing = await Following.findOrCreate({
      attributes: ['follower_id', 'followee_id', 'followee_name', 'profile_picture'],
      where: { [Op.and]: [{ follower_id: req.session.user_id },  req.body ] },
      defaults: {
        follower_id: req.session.user_id,
        followee_id: req.body.followee_id,
        followee_name: req.body.followee_name,
        profile_picture: req.body.profile_picture }
    });

    res.status(200).json(newFollowing);

  } catch (err) { res.status(400).json(err) }
});





module.exports = router;