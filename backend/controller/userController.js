// server/controllers/userController.js

import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import admin from "../firebase.js";
import jwt from "jsonwebtoken";

// ========== REGISTER USER ==========
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Enter a valid email" });
  }

  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Enter a strong password (min 8 characters)" });
  }

  try {
    // Check if Firebase user already exists
    let existingFirebaseUser;
    try {
      existingFirebaseUser = await admin.auth().getUserByEmail(email);
    } catch (_) {
      // not found, okay to create
    }

    if (!existingFirebaseUser) {
      await admin.auth().createUser({
        email,
        password,
        displayName: name,
      });
    }

    // generate and send verification link
    const verificationLink = await admin.auth().generateEmailVerificationLink(email);

    return res.status(200).json({
      success: true,
      message: "Verification email sent",
      verificationLink, // You can display or send via email using nodemailer later
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ========== VERIFY EMAIL + SAVE USER ==========
const verifyEmail = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const fbUser = await admin.auth().getUserByEmail(email);

    if (!fbUser.emailVerified) {
      return res.status(401).json({ success: false, message: "Email not verified yet" });
    }

    const alreadyExists = await userModel.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("Email verify error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// API for user login

const loginUser= async (req,res) => {
    try {
        const {email,password}= req.body;
        const user =await userModel.findOne({email})
        if (!user) {
            return res.json({success:false, message:"User does not exist"})
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.error("Email verify error:", error);
    return res.status(500).json({ success: false, message: error.message });
    }
}




export { registerUser, verifyEmail, loginUser };
