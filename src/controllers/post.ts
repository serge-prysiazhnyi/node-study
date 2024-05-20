import { Request, Response, NextFunction } from "express";

import { HttpError } from "../middleware/error";
import Post from "../models/post";

// @desc Get all posts
// @route GET /api/posts
const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();

    res.json(posts);
  } catch (err: any) {
    console.log("🚀 ~ getPosts ~ err:", err);
    // throw new HttpError(err?.message || "Not found", 500);
  }
};

// @desc Get single post
// @route GET /api/posts/:id
const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const error = new HttpError("Post not found", 404);
      next(error);

      res.status(200).json(post);
    }
  } catch (err: unknown) {
    const error = new HttpError((err as Error).message, 500);
    next(error);
  }
};

// @desc Create post
// @route POST /api/posts/
const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    const error = new HttpError("Please include a title and content", 400);
    next(error);
  }

  try {
    const post = new Post({ title, content, author });
    await post.save();

    res.status(201).json({ msg: "Post created", post });
  } catch (err: unknown) {
    const error = new HttpError((err as Error).message, 500);
    next(error);
  }
};

// @desc Update post
// @route PUT /api/posts/:id
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    const error = new HttpError("Please include a title and content", 400);
    next(error);
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true }
    );

    if (!updatedPost) {
      const error = new HttpError("Post not found", 404);
      next(error);
    }

    res.status(204).json({ msg: "Post updated" });
  } catch (err: unknown) {
    const error = new HttpError((err as Error).message, 500);
    next(error);
  }
};

// @desc Delete post
// @route DELETE /api/posts/:id
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      const error = new HttpError("Post not found", 404);
      next(error);
    }

    res.status(204).json({ msg: "Post deleted" });
  } catch (err: unknown) {
    const error = new HttpError((err as Error).message, 500);
    next(error);
  }
};

export { getPosts, getPost, createPost, updatePost, deletePost };
