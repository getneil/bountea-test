import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { PackageType } from '../types/index'
import { getPackages } from '../lib/db'
import Package from '../components/Package'
import SearchInput from '../components/SearchInput'
import usePackageSearch from '../hooks/packageSearch'
interface HomeProps {
  packages: PackageType[]
}
const Home: NextPage<HomeProps> = ({ packages }: HomeProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const { result } = usePackageSearch(searchTerm, packages)
  const list = searchTerm ? result : packages
  return (
    <>
      <Head>
        <title>BounTea</title>
        <meta name="description" content="Have a BounTea-ful day!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="p-2 md:p-0 min-h-screen">
        <div className="w-full py-4 mt-12 mb-2">
          <SearchInput
            onChange={(search: string) => {
              setSearchTerm(search)
            }}
          />
        </div>
        <ul className="flex flex-col space-y-4">
          {list.map((p) => (
            <Package key={p.slug} value={p} />
          ))}
          {list.length === 0 && searchTerm ? (
            <div className="alert shadow-lg">
              <div>
                <span>Sorry! no matches found. Try using other terms.</span>
              </div>
            </div>
          ) : null}
        </ul>
      </section>
    </>
  )
}

export function getStaticProps() {
  const packages = getPackages()
  return { props: { packages } }
}

export default Home
