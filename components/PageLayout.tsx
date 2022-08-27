import Image from 'next/image'
import Link from 'next/link'

export default function PageLayout({ children }: { children: any }) {
  return (
    <main className="max-w-5xl mx-auto">
      <header className="md:flex justify-between items-center">
        <figure className="cursor-pointer">
          <Link href="/">
            <Image src="/logo.png" width={217} height={75} alt="BounTea" />
          </Link>
        </figure>
        <div className="px-4 text-gray-600 text-center font-thin text-sm md:text-lg md:font-regular">
          Rewarding Opensource Software contributions!
        </div>
      </header>
      {children}
    </main>
  )
}
