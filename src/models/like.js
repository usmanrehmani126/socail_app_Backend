const moongose = require("mongoose");
const { ObjectId } = moongose.Schema.Types;

const likeScheme = new moongose.Schema(
  {
    userId: { type: ObjectId, required: true, ref: "User" },
    postId: { type: ObjectId, required: true, ref: "Post" },
  },
  { timestamps: true }
);

module.exports = moongose.model("Likes", likeScheme);
