import { Request, Response, NextFunction } from "express";

import { HttpError } from "../middleware/error";

interface Post {
  id: string;
  title: string;
  content: string;
}

let posts: Post[] = [
  {
    id: "1",
    title: "Post 1",
    content: "This is the first post",
  },
  {
    id: "2",
    title: "Post 2",
    content: "This is the second post",
  },
  {
    id: "3",
    title: "Post 3",
    content: "This is the third post",
  },
];

// @desc Get all posts
// @route GET /api/posts
const getPosts = (req: Request, res: Response) => {
  console.log("getPosts");

  res.json(posts);
};

// @desc Get single post
// @route GET /api/posts/:id
const getPost = (req: Request, res: Response, next: NextFunction) => {
  const post = posts.find((post) => post.id === req.params.id);

  if (!post) {
    const error = new HttpError("Post not found", 500);
    next(error);
  }

  res.json(post);
};

// @desc Create post
// @route POST /api/posts/
const createPost = (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;

  if (!title || !content) {
    const error = new HttpError("Please include a title and content", 400);
    next(error);
  }

  const newPost = {
    id: String(posts.length + 1),
    title,
    content,
  };

  posts.push(newPost);

  res.status(201).json({ msg: "Post created", post: newPost });
};

// @desc Update post
// @route PUT /api/posts/:id
const updatePost = (req: Request, res: Response, next: NextFunction) => {
  const post = posts.find((post) => post.id === req.params.id);

  if (!post) {
    const error = new HttpError("Post not found", 404);
    next(error);
  }

  const { title, content } = req.body;

  if (!title || !content) {
    const error = new HttpError("Please include a title and content", 400);
    next(error);
  }

  posts = posts.map((post) => {
    if (post.id === req.params.id) {
      return {
        ...post,
        title,
        content,
      };
    }

    return post;
  });

  res.status(204).json({ msg: "Post updated" });
};

// @desc Delete post
// @route DELETE /api/posts/:id
const deletePost = (req: Request, res: Response, next: NextFunction) => {
  const post = posts.find((post) => post.id === req.params.id);

  if (!post) {
    const error = new HttpError("Post not found", 404);
    next(error);
  }

  posts = posts.filter((post) => post.id !== req.params.id);

  res.status(204).json({ msg: "Post deleted" });
};

export { getPosts, getPost, createPost, updatePost, deletePost };
