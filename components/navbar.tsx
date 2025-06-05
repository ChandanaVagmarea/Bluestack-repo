import Link from "next/link"
import { ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 12L8 4L12 12L16 4L20 12"
                  stroke="#4338ca"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 20L8 12L12 20L16 12L20 20"
                  stroke="#4338ca"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="18" cy="4" r="2" fill="#f97316" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">BLUESTOCK</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/products" className="text-gray-600 hover:text-gray-900">
            PRODUCTS
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
            PRICING
          </Link>
          <Link href="/community" className="text-gray-600 hover:text-gray-900">
            COMMUNITY
          </Link>
          <div className="relative group">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              MEDIA
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
          <div className="relative group">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              SUPPORT
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/signin" className="hidden md:inline-block text-gray-600 hover:text-gray-900">
            Sign In
          </Link>
          <Button className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700">Sign Up Now</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
