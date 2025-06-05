import { NextResponse } from "next/server"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

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

// Define Company Schema
const companySchema = new mongoose.Schema({
  name: String,
  logo: String,
  priceRange: String,
  openDate: String,
  closeDate: String,
  issueSize: String,
  issueType: String,
  listingDate: String,
})

// Get the models (or create them if they don't exist)
const User = mongoose.models.User || mongoose.model("User", userSchema)
const Company = mongoose.models.Company || mongoose.model("Company", companySchema)

export async function GET() {
  try {
    await connectDB()

    // Check if we already have users
    const userCount = await User.countDocuments()

    if (userCount === 0) {
      // Create admin user
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash("admin123", salt)

      await User.create({
        name: "Admin User",
        email: "admin@bluestock.com",
        password: hashedPassword,
        role: "admin",
      })

      // Create regular user
      const userSalt = await bcrypt.genSalt(10)
      const userHashedPassword = await bcrypt.hash("user123", salt)

      await User.create({
        name: "Regular User",
        email: "user@bluestock.com",
        password: userHashedPassword,
        role: "user",
      })
    }

    // Check if we already have companies
    const companyCount = await Company.countDocuments()

    if (companyCount === 0) {
      // Seed initial data
      const initialCompanies = [
        {
          name: "Nova Agritech Ltd.",
          logo: "/placeholder.svg?height=50&width=50",
          priceRange: "Rs 39 - 41",
          openDate: "2024-01-22",
          closeDate: "2024-01-24",
          issueSize: "143.81 Cr.",
          issueType: "Book Built",
          listingDate: "2024-01-30",
        },
        {
          name: "EPACK Durable Ltd.",
          logo: "/placeholder.svg?height=50&width=50",
          priceRange: "Rs 218 - 230",
          openDate: "2024-01-19",
          closeDate: "2024-01-23",
          issueSize: "640.05 Cr.",
          issueType: "Book Built",
          listingDate: "2024-01-29",
        },
        {
          name: "RK Swamy Ltd.",
          logo: "/placeholder.svg?height=50&width=50",
          priceRange: "Not Issued",
          openDate: "Not Issued",
          closeDate: "Not Issued",
          issueSize: "Not Issued",
          issueType: "Book Built",
          listingDate: "Not Issued",
        },
        {
          name: "Oravel Stays Ltd.",
          logo: "/placeholder.svg?height=50&width=50",
          priceRange: "Not Issued",
          openDate: "Not Issued",
          closeDate: "Not Issued",
          issueSize: "8430 Cr.",
          issueType: "Book Built",
          listingDate: "Not Issued",
        },
        {
          name: "Imagine Marketing Ltd.",
          logo: "/placeholder.svg?height=50&width=50",
          priceRange: "Not Issued",
          openDate: "Not Issued",
          closeDate: "Not Issued",
          issueSize: "2000 cr.",
          issueType: "Book Built",
          listingDate: "Not Issued",
        },
        {
          name: "Kids Clinic India Ltd.",
          logo: "/placeholder.svg?height=50&width=50",
          priceRange: "Not Issued",
          openDate: "Not Issued",
          closeDate: "Not Issued",
          issueSize: "Not Issued",
          issueType: "Book Built",
          listingDate: "Not Issued",
        },
      ]

      await Company.insertMany(initialCompanies)
    }

    return NextResponse.json({
      message: "Database seeded successfully",
      users: await User.countDocuments(),
      companies: await Company.countDocuments(),
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
