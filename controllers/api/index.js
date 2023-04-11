const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const testingRoutes = require('./testing');

router.use('/users', userRoutes);
router.use('/projects', postRoutes);
router.use('/testing', testingRoutes);

module.exports = router;