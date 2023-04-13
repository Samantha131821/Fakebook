const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//New post gets crated
router.post('/', withAuth, async (req, res) => {
  console.log('req.body',req.body);
  console.log('req.session',req.session);
  try {
    const newPost = await Post.create({...req.body, user_id: req.session.user_id, });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

 


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        post_id: req.params.id
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
