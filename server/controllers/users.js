const usersRouter = require('express').Router();
const User = require('../models/User');


//Create a new user
//Needs the parameters: email, username, name. 
//Authomatically creates a blog array for the user. 
usersRouter.post('/', async (req, res) => {
    const { email, username, name, uid } = req.body;
    
    try {
        const user = new User({
            name: name,
            username: username,
            email: email,
            blogs: [],
            uid: uid
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            //If the email already exists, return an error. 
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
            console.log(error);
        }
    }
});


//Get a user's profile by id
usersRouter.get('/profile/others/:id', async (request, response) => {
    const { id } = request.params;
    const user = await User.findOne({ uid: id });
    response.json(user);
})

//Gets all users. 
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate()
    response.json(users)
})


//Get specific user profile by query. Used in the find users in HOME page. 
usersRouter.get('/profile', async (request, response) => {
    const searchTerm = request.query.name || request.query.query;
    
    try {
        // Create a case-insensitive regex pattern that matches anywhere in the name
        const users = await User.find({ 
            name: { 
                $regex: searchTerm || '', 
                $options: 'i' 
            } 
        });
        
        response.json(users);  // Will return empty array if no users found
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
        console.log(error);
    }
})







module.exports = usersRouter;
