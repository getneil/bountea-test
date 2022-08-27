import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>BounTea</title>
        <meta name="description" content="Have a BounTea-ful day!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Welcome to <a href="https://bountea-test.vercel.app/">BounTea!</a>
            </h1>
            <p className="py-6">Have a BounTea-ful day!</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
