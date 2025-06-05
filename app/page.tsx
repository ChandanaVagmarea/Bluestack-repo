import CompanyListings from "@/components/company-listings"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <CompanyListings />
      </div>
    </main>
  )
}
