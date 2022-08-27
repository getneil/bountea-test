import Image from 'next/image'
import Link from 'next/link'
import { FaLeaf } from 'react-icons/fa'

export default function PageLayout({ children }: { children: any }) {
  return (
    <main className="max-w-5xl mx-auto">
      <header className="flex justify-between items-center">
        <figure className="cursor-pointer">
          <Link href="/">
            <div className="ml-4 md:ml-0 w-48 text-3xl bg-green-600 hover:bg-green-700 shadow-md transition-colors text-white flex h-20 px-4 items-center align-middle rounded-b-md">
              <FaLeaf /> <div>&nbsp;BounTea</div>
            </div>
          </Link>
        </figure>
        <div className="px-4 text-gray-600 font-thin text-sm md:text-lg md:font-regular">
          Rewarding Opensource Software contributions!
        </div>
      </header>
      {children}
      <footer className="text-center h-32 mt-8 py-8">
        &copy; Copyright 2022 Tea Inc.
      </footer>
    </main>
  )
}
