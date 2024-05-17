import express from 'express'

const router = express.Router();

interface Post {
    id: string;
    title: string;
    content: string;
}

let posts: Post[] = [
    {
        id: '1',
        title: 'Post 1',
        content: 'This is the first post'
    },
    {
        id: '2',
        title: 'Post 2',
        content: 'This is the second post'
    },
    {
        id: '3',
        title: 'Post 3',
        content: 'This is the third post'
    }
]

router.get('/', (_, res) => {
    res.json(posts);
})

router.get('/:id', (req, res) => {
    const post = posts.find((post) => post.id === req.params.id);

    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
})

router.post('/', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ msg: 'Please include a title and content' });
    }

    const newPost = {
        id: String(posts.length + 1),
        title,
        content
    }

    posts.push(newPost);

    res.status(201).json({ msg: 'Post created', post: newPost });
})

router.put('/:id', (req, res) => {
    const post = posts.find((post) => post.id === req.params.id);

    if(!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ msg: 'Please include a title and content' });
    }

    posts = posts.map((post) => {
        if (post.id === req.params.id) {
            return {
                ...post,
                title,
                content
            }
        }

        return post;
    })

    res.status(204).json({ msg: 'Post updated' });
})

router.delete('/:id', (req, res) => {
    const post = posts.find((post) => post.id === req.params.id);

    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }

    posts = posts.filter((post) => post.id !== req.params.id);

    res.status(204).json({ msg: 'Post deleted' });
})

export default router;
