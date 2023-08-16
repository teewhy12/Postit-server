const User = require("../models/users");
const {handleUserError} = require("../middleware/handleError");

const registerUser = async (req, res) => {
    try {
        const user = await User.create({ ...req.body })
        res.status(201).json({ success: true, user });
    } catch (error) {
        console.log(error);
       const errors = handleUserError(error)
       res.status(400).json(errors);
    }
};


//login
const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password ) {
        return res.status(400).json({ success: false, message: "Please provide necessary details" });
    }
  
    try {
        const user = await User.findOne({ email });
        if(!user) {
            throw Error ("incorrect email")
        }

        const authenticated = await user.comparePassword(password);
        if(!authenticated) {
            throw Error ("bad auth");
        }

        //generate token
        const token = user.generateToken();
        res.status(200).json({success: true,
            user: { username: user.username, email: user.email },
             token,
        });
    } catch (error) {
        console.log(error);
        const errors = handleUserError(error);
        res.status(400).json(errors);
    }
};

const foundUser = async (req, res) => {
    const { userId } = req.user;
    const user = await User.findById({ _id: userId})
    res.status(200).json({ success: true, username: user.username });
};

module.exports = { registerUser, loginUser, foundUser };