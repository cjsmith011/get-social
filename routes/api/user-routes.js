const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    //createFriend,
    //deleteFriend
  } = require('../../controllers/user-controller');

// Set up GET all and POST at /api/Users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//POST and DELETE friends at /users/:userId/friends/:friendId
// router
//   .route('/:id/friends/:friendId')
//   .post(createFriend)
//   .delete(deleteFriend);

module.exports = router;