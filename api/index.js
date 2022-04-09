const router = require('express').Router();
// Import all of the API routes from /api/index.js (no need for index.js though since it's implied)
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;