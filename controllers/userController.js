const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../Validator/validators");


exports.register = async (req, res) => {
    try {
        const { error } = registerValidation(req.body);
        if (error) {
            // return res.status(400).send(error.details[0].message);
            return res.status(400).send(error);
        }

        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json({ message: "Email aready exist, Please login!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            // password: req.body.password,
            password: hashedPassword,
            mobile: req.body.mobile,
            status: req.body.status,
            role: req.body.role
        });

        const saveUser = await user.save();
        res.status(200).json({
            message: "new User Created Successfully.",
            user
        });

    } catch (err) {
        res.status(400).send(err);
    }
};


exports.login = async (req, res) => {

    try {
        const { error } = loginValidation(req.body);
        if (error) {
            return res.status(400).send("error.details[0].message");
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: "Incorrect Username or Password" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Incorrect Email or Password" });
        }

        const maxTime = 3*60;
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
        });

        res.cookie("jwt", token, {
            httpOnly : true,
            maxTime : maxTime * 1000
        });

        res.header("auth-token", token);

        res.json({ token, user: { email: req.body.email, user_id: user._id, user_status: user.status, user_role: user.role }, expiresIn: '1h' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ _id: -1 }).select("-password");
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params._id);
        if (!user) {
            return res.status(404).json({ message: "User not Found" })
        }
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        //const user = await User.findOne(req.params._id);
        const user = await User.findByIdAndUpdate(req.params._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.mobile = req.body.mobile || user.mobile;
        user.status = req.body.status || user.status;
        user.role = req.body.role || user.role;

        await user.save();

        res.status(200).json({ user })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUserById = async (req, res) => {
    await User.findById(req.params._id)
        .then(user => user.deleteOne())
        .then(user =>
            res.status(201).json({ message: "User successfully deleted", user })
        )
        .catch(error =>
            res
                .status(400)
                .json({ message: "An error occurred", error: error.message })
        )
}

exports.otpCheck = async (req, res) => {
    const otp = req.query.otp;
    if (/^\d{4}$/.test(otp)) {
        res.status(200).json({ message: "Success" });
    } else {
        res.status(400).json({ message: "Incorrect OTP" });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        // const user = await user.findOne(req.params._id);
        // if(user.role == "student")
        const students = await User.find({ role: "student" }).select('-email').select('password').select('mobile').select('status');
        res.status(200).json({ students });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user.password = hashedPassword

        await user.save();
        res.status(200).json({ message: "Password Changed Successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



