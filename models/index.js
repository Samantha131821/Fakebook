const User = require('./User');
const Post = require('./Post');
const Comment = require('./comment');
const Following = require('./Following');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Following, {
  foreignKey: 'follower_id',
  onDelete: 'CASCADE'
});

Following.belongsTo(User, {
  foreignKey: 'follower_id'
});

Following.hasMany(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.belongsTo(Following, {
  foreignKey: 'user_id'
});





module.exports = { User, Post, Comment, Following };
