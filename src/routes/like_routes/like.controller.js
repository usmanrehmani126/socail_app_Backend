const LikeModal = require("../../models/like");
const PostModal = require("../../models/post");
const likeDislike = async (req, res) => {
  const { postId, userId } = req.body;
  const existingLike = await LikeModal.findOne({ postId, userId });
  try {
    if (!existingLike) {
      await LikeModal.create(req.body);
      await PostModal.findByIdAndUpdate(
        postId,
        { $inc: { likeCount: 1 } },
        { new: true }
      );
      return res.status(200).json({ message: "Like Added Successfully..." });
    } else {
      await LikeModal.findByIdAndDelete(existingLike._id);
      await PostModal.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
      return res.status(200).json({ message: "Like remove Successfully..." });
    }
  } catch (error) {
    res.status(403).json({ status: false, error: error });
  }
};
const likesByPost = async (req, res) => {
  const { postId } = req.query;
  try {
    const result = await LikeModal.find({ postId: postId });
    res.send({
      data: result,
      status: true,
    });
  } catch (error) {
    res.status(403).json({ status: false, error: error });
  }
};

module.exports = {
  likeDislike,
  likesByPost,
};
