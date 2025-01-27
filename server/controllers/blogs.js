const blogsRouter = require('express').Router();
const Blog = require('../models/Blog'); 
const User = require('../models/User');


//Create a new blog
//Needs the parameters: title, description, type, email, album_id, rating. 
blogsRouter.post('/', async (req, res) => {
    const { title, description, type, email, item_id, rating, username, id} = req.body;

    const user = await User.findOne({ uid: id });

    const blog = new Blog({ 
        title : title,
        description : description,
        type : type,
        user : user.uid,
        item_id: item_id,
        username: username,
        rating: rating,
        email: email
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
});


//Get all blogs. 
blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.json(blog);
});


//Get 3 random blogs. Used for the home page. 
blogsRouter.get('/random/album', async (req, res) => {
    const blogs = await Blog.find({type: 'album'});
    const randomBlogs = blogs.sort(() => Math.random() - 0.5).slice(0, 3);
    res.json(randomBlogs);
});

//Get 3 random blogs. Used for the home page. 
blogsRouter.get('/random/artist', async (req, res) => {
    const blogs = await Blog.find({type: 'artist'});
    const randomBlogs = blogs.sort(() => Math.random() - 0.5).slice(0, 3);
    res.json(randomBlogs);
});


//Get 3 random blogs. Used for the home page. 
blogsRouter.get('/random/track', async (req, res) => {
    const blogs = await Blog.find({type: 'track'});
    const randomBlogs = blogs.sort(() => Math.random() - 0.5).slice(0, 3);
    res.json(randomBlogs);
});


//Get all album blogs by a user. Used when viewing a user's profile. 
blogsRouter.get('/mine/album/:id', async (req, res) => {

    try {

        const uid = req.params.id;


        if (!uid) {
            return res.status(400).json({ error: 'ID is required' });
        }
        
        // Assuming you have a Blog model and a method to find blogs by user email
        const userBlogs = await Blog.find({ user: uid, type: 'album' });


        if (!userBlogs) {
            return res.status(404).json({ error: 'No blogs found for this user' });
        }


        res.status(200).json(userBlogs);
    } catch (error) {
        console.error('Error fetching user blogs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


blogsRouter.get('/mine/artist/:id', async (req, res) => {
    try {

    const uid = req.params.id;

    const userBlogs = await Blog.find({ user: uid, type: 'artist' });

    if (!userBlogs) {
        return res.status(404).json({ error: 'No blogs found for this user' });
    }

    res.json(userBlogs);

    } catch (error) {
        console.error('Error fetching users artist blogs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }   
});


blogsRouter.get('/mine/track/:id', async (req, res) => {

    try {
        const uid = req.params.id;
        const userBlogs = await Blog.find({ user: uid, type: 'track' });
        res.json(userBlogs);
    } catch (error) {
        console.error('Error fetching users track blogs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//Get all blogs by an album. 
//This is another place where id is used instead of type_id. 
blogsRouter.get('/album/:id', async (req, res) => {
    const albumId = req.params.id;

    const albumBlogs = await Blog.find({item_id: albumId});

    if (albumBlogs.length === 0) {
        return res.json([]);
    }
    res.json(albumBlogs);
});

//Get all blogs by an artist. 
//This is another place where id is used instead of type_id. 
blogsRouter.get('/artist/:id', async (req, res) => {
    const artistId = req.params.id;
    const artistBlogs = await Blog.find({item_id: artistId});
    if (artistBlogs.length === 0) {
        return res.json([]);
    }
    
    res.json(artistBlogs);
});

//Get all blogs by a track. 
blogsRouter.get('/track/:id', async (req, res) => {
    const trackId = req.params.id;
    const trackBlogs = await Blog.find({item_id: trackId});
    if (trackBlogs.length === 0) {
        return res.json([]);
    }
    
    res.json(trackBlogs);
});









module.exports = blogsRouter;