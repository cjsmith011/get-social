const router = require('express').Router();
// Import all of the API routes from /api/index.js (no need for index.js though since it's implied)
const userRoutes = require('./api/user-routes');
const thoughtRoutes = require('./api/thought-routes');
const { route } = require('./api/user-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
//router.use('/friends', userRoutes);

module.exports = router;