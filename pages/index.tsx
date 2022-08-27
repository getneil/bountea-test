import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { PackageType } from '../types/index'
import { getFormulas } from '../lib/db'
import Package from '../components/Package'

interface HomeProps {
  packages: PackageType[]
}
const Home: NextPage<HomeProps> = ({ packages }: HomeProps) => {
  return (
    <>
      <Head>
        <title>BounTea</title>
        <meta name="description" content="Have a BounTea-ful day!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <ul>
          {packages.map((p) => (
            <Package key={p.slug} value={p} />
          ))}
        </ul>
      </section>
    </>
  )
}

export function getStaticProps() {
  const packages = getFormulas()
  return { props: { packages } }
}

export default Home
