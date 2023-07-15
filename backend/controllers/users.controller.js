import { hash, compare } from 'bcrypt';
import User from '../models/users.model.js';


// Controller for creating a new user
const createUser = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, address } = req.body;

        // Check if the username or email already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already exists' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            address,
            isAdmin: false
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            message: 'User saved successfully',
            data: savedUser
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Controller for getting all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for getting a specific user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for updating a specific user by ID
const updateUserById = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for deleting a specific user by ID
const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.params.id);
        if (deletedUser) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for checking user credentials during login
const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ $or: [{ username }, { email, }] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username/password' });
        }

        let message;
        if (user.isAdmin) {
            message = 'Admin login successful';
            // Additional admin-specific logic here
        } else {
            message = 'User login successful';
            // Additional user-specific logic here
        }

        res.json({ message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    loginUser
};
