'use client'

import { useSession } from "next-auth/react"

const Home = () => {
  const {data: session} = useSession();
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Next.js with Tailwind CSS</h1>
        <p className="text-gray-600">Start building your awesome app!</p>
      </div>
    </div>

  )
}

export default Home