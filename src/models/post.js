const moongose = require("mongoose");
const { ObjectId } = moongose.Schema.Types;

const mediaScheme = new moongose.Schema({
  type: {
    type: String,
    enum: ["image", "video"],
    required: false,
  },
});

const postScheme = new moongose.Schema(
  {
    media: [mediaScheme],
    description: { type: String },
    userId: { type: ObjectId, required: true, ref: "User" },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = moongose.model("Post", postScheme);
