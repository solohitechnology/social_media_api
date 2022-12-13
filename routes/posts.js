const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

//creat a apost;
router.post('/', async (req, res) => {
    const newPost = await new Post(req.body)
    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update a post;

router.put('/:id', async (req, res) => {
    try {
        const post = Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.updateOne({ $set: req.body.json });
            res.status(200).json(' the post has been updated! ')
        } else {
            res.status(403).json('you can update only your post');
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

// delete a post; 

router.delete('/:id', async (req, res) => {
    try {

        const post = Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.findByIdAndDelete();
            res.status(200).json(' the post has been deleted! ');
        } else {
            res.status(403).json('you can delete only your post');
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

//like / disliked a post ;

router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.like.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json(' the post has been liked ')
        } else {
            await Post.updateOne({ $pull: { like: req.body.userId } });
            res.status(200).json('the post has benn disliked')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
// get a post ;
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err)
    }
});

// get timeline post;

router.get('/timline/all', async (req, res) => {
    //const pastArray = [];
    try {
        const currentUser = await User.findById(req.body.userId);
        const userpost = await Post.find({ userId: currentUser.id });
        const freindposts = await Promise.all(
            currentUser.followings.map((freindId) => {
                return Post.find({ userId: freindId })
            })
        );
        res.status(200).json(userpost.concat(...freindposts))
    } catch (err) {
        res.status.apply(500).json(err);
    };
});



module.exports = router;