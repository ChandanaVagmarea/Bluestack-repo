"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Company type definition
interface Company {
  _id: string
  name: string
  logo: string
  priceRange: string
  openDate: string
  closeDate: string
  issueSize: string
  issueType: string
  listingDate: string
}

export default function CompanyListings() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Fetch companies from our API route
        const response = await fetch("/api/companies")

        if (!response.ok) {
          throw new Error("Failed to fetch companies")
        }

        const data = await response.json()
        setCompanies(data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching companies:", err)
        setError("Failed to load companies. Please try again later.")
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => (window.location.href = "/api/seed")} className="mt-4">
          Seed Database
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-3 gap-6 shadow-lg space-y-6 space-x-6 shadow-top
     border-black">
      {companies.map((company) => (
        <div key={company._id} className="border-b pb-6 py-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative h-12 w-12 overflow-hidden pl-5">
              <Image
                src={company.logo || "/placeholder.svg?height=50&width=50"}
                alt={`${company.name} logo`}
                fill
                className="object-contain pl-5"
              />
            </div>
            <h3 className="text-blue-600 font-medium pl-5">{company.name}</h3>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm pl-5">
            <div className="text-gray-600">PRICE BAND</div>
            <div className="text-gray-600">OPEN</div>
            <div className="text-gray-600">CLOSE</div>

            <div className="font-medium">{company.priceRange}</div>
            <div className="font-medium">{company.openDate}</div>
            <div className="font-medium">{company.closeDate}</div>

            <div className="text-gray-600 mt-4">ISSUE SIZE</div>
            <div className="text-gray-600 mt-4">ISSUE TYPE</div>
            <div className="text-gray-600 mt-4">LISTING DATE</div>

            <div className="font-medium">{company.issueSize}</div>
            <div className="font-medium">{company.issueType}</div>
            <div className="font-medium">{company.listingDate}</div>
          </div>

          {company.name === "Nova Agritech Ltd." || company.name === "EPACK Durable Ltd." ? (
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full px-4 py-1 h-8"
              >
                RHP
              </Button>
              <Button className="bg-red-500 hover:bg-red-600 rounded-full px-4 py-1 h-8">DRHP</Button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
