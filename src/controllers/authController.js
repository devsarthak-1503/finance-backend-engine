const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Generate JWT Token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 🔹 Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        // 🔹 Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // 🔹 Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'viewer', // default role
        });

        // 🔹 Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
        });
    }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔹 Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
        }

        // 🔹 Find user
        const user = await User.findOne({ email });

        // 🔥 IMPORTANT FIX: user existence + inactive check
        if (!user || user.status === 'inactive') {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials or inactive user',
            });
        }

        // 🔹 Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // 🔹 Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            data: {
                id: user._id,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login failed',
        });
    }
};
