const router = require('express').Router();
const { 
    addThought, 
    removeThought,
    addReaction,
    removeReaction } = require('../../controllers/thought-controller');

// /api/comments/<pizzaId>
router.route('/:userId').post(addThought);

// /api/comments/<pizzaId>/<commentId>
router
.route('/:userId/:thoughtId')
.put(addReaction)
.delete(removeReaction);

router
.route('/:userId/:thoughtId/:reactionId')
.delete(removeReaction);

module.exports = router;