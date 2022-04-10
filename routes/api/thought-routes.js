const router = require('express').Router();
const { 
    addThought, 
    getAllThoughts,
    getThoughtById,
    updateThought,
    removeThought,
    addReaction,
    removeReaction 
} = require('../../controllers/thought-controller');

// /api/thoughts/<userID>  add a thought
router.route('/:userId')
.post(addThought);

//api/thoughts
router.route('/')
.get(getAllThoughts);

//api/thoughts/thought id
router.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)

//remove a thought
router.route('/:userId/thoughts/:thoughtId')
.delete(removeThought);


// /api/thoughts/<userId>/<thoughtId>
router
.route('/:userId/:thoughtId')
.post(addReaction)
.delete(removeThought);

//remove a reaction
router
.route('/:userId/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;