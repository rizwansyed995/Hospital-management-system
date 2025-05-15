// server/controllers/userController.js

import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { json } from "express";
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js";
import appointmentModel from '../models/appointmentModel.js'

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
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};



// API for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: "User does not exist" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    console.error("Email verify error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

//API to get user profile data 
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select('-password')
    res.json({ success: true, userData })

  } catch (error) {
    console.error("Email verify error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

//API to update User Profile

const  updateProfile = async (req, res) => {
  try {

    const { userId, name, phone, address, dob, gender } = req.body
    const imageFile = req.file
    if (!name || !phone || !address || !dob || !gender) {
      return res.json({success:false,message:"Missing Details"})
    }
    await userModel.findByIdAndUpdate(userId, {name,phone,address:JSON.parse(address ),dob,gender})
    if (imageFile) {
      // Upload image to cloudinary
      const imageUpload= await cloudinary.uploader.upload(imageFile.path,{resource_type: 'image'})
      const imageURL = imageUpload.secure_url
      await userModel.findByIdAndUpdate(userId,{image:imageURL})
    }
    res.json({success:true, message:"Profile Updated"})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

//API to book appointment

const bookAppointment = async (req,res) => {
  try {
    const {userId,docId,slotDate,slotTime}= req.body
    const docData = await doctorModel.findById(docId).select('-password')
    if(!docData.available){
      return res.json({success:false,message:"doctor not available"})
    }
    let slots_booked = docData.slots_booked

    // checking for slots availability 
    if(slots_booked[slotDate]){
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({success:false,message:"Slot not available"})
      }else{
        slots_booked[slotDate].push(slotTime)
      }
    }else{
      slots_booked[slotDate]=  []
      slots_booked[slotDate].push(slotTime)
    }

    const userData= await userModel.findById(userId).select('-password')

    delete docData.slots_booked

    const appointmentData={
      userId, docId,userData,docData,amount:docData.fees,slotTime,slotDate,date:Date.now() 
    }

    const newAppointment  = new appointmentModel(appointmentData)
    await newAppointment.save() 
    
    // save new slots in doctor data
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    res.json({success:true,message:"appointment booked"})


  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
  
}

//API to get user appointment for frontend myAppointment page
const listAppointments = async (req,res) => {
  try {
    
    const {userId}= req.body
    const appointments = await appointmentModel.find({userId})
    res.json({success:true,appointments})

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
  
}
const updatePaymentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.body

    const updated = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { payment: true },
      { new: true }
    )

    if (!updated) return res.json({ success: false, message: 'Appointment not found' })

    res.json({ success: true, message: 'Payment updated successfully', appointment: updated })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}


export { registerUser, loginUser, getProfile,updateProfile,bookAppointment,listAppointments,updatePaymentStatus };
