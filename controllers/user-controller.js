const { User } = require('../public/models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    //this cleans up our returned data to take away the v since it doesn't mean anything to a user
    .select('-__v')
    //this will sort the results in desc order
    .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    //this cleans up our returned data to take away the v since it doesn't mean anything to a user
    .select('-__v')
      .then(dbUserData => {
        // If no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'Sorry, that user does not exist!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // create a user
createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },
// update user by id
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: "Sorry, we don't have a user with that id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
   //this will add a reaction to a thought
   addFriend({ params, body }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: body } },
        { new: true, runValidators: true }
      )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'ooops, we do not have a user with that id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
    },
    deleteFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: { friendId: params.friendId } } },
      { new: true }
      )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  },
  // delete a user
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'That user does not exist, unable to delete' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = userController;