const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../../utils/dateFormat');

const ReactionSchema = new Schema({
  reactionId: {
  type: Schema.Types.ObjectId,
  default: () => new Types.ObjectId()
  },
userName: {
  type: String, 
  required: true
  },
reactionBody: {
  type: String,
  required: true,
  max: 280
  },
createdAt: {
  type: Date,
  default: Date.now,
  get: createdAtVal => dateFormat(createdAtVal)
    }
  },
{
toJSON: {
  getters: true
  }
}
);

//this will allow users to share their thoughts on our social
const ThoughtSchema = new Schema({
      thoughtText: {
      type: String,
      required: true,
      min: 1, max: 280
    },
    userName: {
      type: String, 
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);



//this will put in a count of replies
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;