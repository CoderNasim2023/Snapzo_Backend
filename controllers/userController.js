import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { ToastContainer, toast } from "react-toastify";

//login user  with jwt 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        //its calls not isMatch function
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = createToken(user._id)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//create Token arrow function
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
}

//register user
const registerUser = async (req, res) => {

    const { name, password, email } = req.body;

    try {
        // checking  is user already exists or not??
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // Validating  email format & strong password 
        if (!validator.isEmail((email))) {
            return res.json({ success: false, message: "Please Enter a strong Passowrd " })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter Passowrd greater than 8 charecters" })
        }


        // Hashing user password  using bcrypt package manager 
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);


        const newUser = new userModel({
            name: name,
            email: email,
            password: hashPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "An Error occured " })
    }
}


export { loginUser, registerUser };