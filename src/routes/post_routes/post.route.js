const express = require("express");
const router = express.Router();

const post_controller = require("./post.controller");
const uploadMiddleware = require("../../middleware/fileUpload");
const auth=require('../../middleware/auth');
router.post("/createPost", uploadMiddleware, post_controller.createPost);
router.get("/getPost",auth, post_controller.allPost);
module.exports = router;
