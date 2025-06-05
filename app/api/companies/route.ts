import { NextResponse } from "next/server";
import mongoose from "mongoose";

// MongoDB connection setup
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "yourDatabaseName", // optional, for clarity
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

// Define Company Schema with timestamps
const companySchema = new mongoose.Schema(
  {
    name: String,
    logo: String,
    priceRange: String,
    openDate: String,
    closeDate: String,
    issueSize: String,
    issueType: String,
    listingDate: String,
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Get or create Company model
const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);

// GET handler: Fetch all companies
export async function GET() {
  try {
    await connectDB();

    const companies = await Company.find().sort({ createdAt: -1 });

    return NextResponse.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

// POST handler: Seed initial dummy data
export async function POST() {
  try {
    await connectDB();

    const count = await Company.countDocuments();

    if (count === 0) {
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
          issueSize: "2000 Cr.",
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
      ];

      await Company.insertMany(initialCompanies);
      return NextResponse.json({ message: "Database seeded successfully" });
    }

    return NextResponse.json({ message: "Database already contains data" });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
