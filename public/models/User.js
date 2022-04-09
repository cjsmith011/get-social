const { Schema, model } = require('mongoose');
const dateFormat = require('../../utils/dateFormat');

const UserSchema = new Schema({
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  //this will tell the schema to go look for teh virtual below
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  });

//this will count the friends on each user
userSchema.virtual('friendCount').get(function() {
  return this.friends.reduce((total, friend) => total + friend.replies.length +1, 0);
});

  // create the User model with the schema given
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;