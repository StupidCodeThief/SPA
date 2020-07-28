const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Post = require("../../models/Post");
const User = require("../../models/User");
const authMiddleware = require("../../middleware/auth");
const { post } = require("./auth");

// @route POST api/posts
// @desc Create a post
// @access Private
router.post(
  "/",
  [authMiddleware, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      await newPost.save();

      res.status(201).json(newPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route GET api/posts
// @desc Get all posts
// @access Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    if (!posts) {
      return res.status(404).json({ msg: "Posts not found" });
    }

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Private
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route DELETE api/posts/:id
// @desc Delete post by id
// @access Private
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route PATCH api/posts/like/:id
// @desc Like post
// @access Private
router.patch("/like/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.push({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route PATCH api/posts/unlike/:id
// @desc Unlike post
// @access Private
router.patch("/unlike/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "The post has not yet been liked" });
    }

    const removeIndex = post.likes.findIndex(
      (like) => like.user.toString() === req.user.id
    );

    if (removeIndex === -1) {
      return res.status(404).json({ msg: "Like not found" });
    }

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route PATCH api/posts/comment/:id
// @desc Add a comment to post
// @access Private
router.patch(
  "/comment/:id",
  [authMiddleware, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment from post
// @access Private
router.delete(
  "/comment/:id/:comment_id",
  [authMiddleware],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ msg: "Comment not found" });
      }

      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      if (!comment) {
        return res.status(404).json({ msg: "Comment not found" });
      }

      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      const removeIndex = post.comments.findIndex(
        (comment) => comment.id === req.params.comment_id
      );

      if (removeIndex === -1) {
        return res.status(404).json({ msg: "Comment not found" });
      }

      post.comments.splice(removeIndex, 1);

      await post.save();

      res.json(post.comments);
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "Comment not found" });
      }
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
