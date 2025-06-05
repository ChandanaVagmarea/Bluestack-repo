import { NextResponse } from "next/server"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// Connect to MongoDB
let isConnected = false
const connectDB = async () => {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGO_URI!)
    isConnected = true
    console.log("MongoDB connected")
  } catch (error) {
    console.error("MongoDB connection error:", error)
  }
}

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Get the User model (or create it if it doesn't exist)
const User = mongoose.models.User || mongoose.model("User", userSchema)

export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const { email, password } = body

    // Find user by email
    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 })
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" })

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
