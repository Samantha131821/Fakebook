const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Gets comments for each post (WORKS)
router.get('/', (req, res) => {
  Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});








// New comment (WORKING)
router.post('/comments2', withAuth, async (req, res) => {
  // console.log('req.body',req.body);
  // console.log('req.session',req.session);
  const targetObj = {...req.body, user_id: req.session.user_id };
  console.log("WE ARE HERE!!!")
  console.log(targetObj)
  try {
    const newComment = await Comment.create(targetObj);
    console.log(newComment);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});







// Deletes Post comment (DO NOT CHANGE!)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Comment.destroy({
      where: { comment_id: req.params.id },
    });

    if (!postData) {
      res.status(404).json({ message: 'No comments found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;