const res = require('express/lib/response');
const { Thought, User } = require('../public/models');
const { db } = require('../public/models/Thought');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
        .then(dbUserData => {
        // If no thought is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'Sorry, that social thought does not exist!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //add a thought to a user
  addThought({ params, body }, res) {
      Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: "Sorry, we don't have a user with that id :(" });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
  },
  //this will add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
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
  // update thought by id
  updateThought({ params, body }, res) {
  Thought.findOneAndUpdate({ _id: params.thoughtId }, body)
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: "Sorry, we don't have a social thought with that id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  },
    //delete a thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: 'No thought matches that id!' });
            }
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with that thought!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
       //this will remove a reaction from a thought
    removeReaction({ params }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
      )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  },
    }


module.exports = thoughtController;