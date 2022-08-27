import type { NextPage, GetServerSideProps } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { PackageType, RepoDetailsType } from '../../types/index'
import { getPackageBySlug } from '../../lib/db'
import { getRepoDetails } from '../../lib/github'
import dayjs from 'dayjs'
import GithubStats from '../../components/GithubStats'
interface RepoPageProps {
  pkg?: PackageType
  repoDetails?: RepoDetailsType
}

const RepoPage: NextPage<RepoPageProps> = ({
  pkg,
  repoDetails,
}: RepoPageProps) => {
  return (
    <>
      <Head>
        <title>BounTea | {pkg?.name || 'Not Found'}</title>
        <meta name="description" content={pkg?.desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="p-4 md:p-0 min-h-screen">
        {repoDetails && pkg && (
          <article className="mt-4 flex flex-col md:flex-row">
            <section className="flex-grow">
              <h1 className="text-3xl md:text-5xl text-green-700">
                {repoDetails.name}
              </h1>
              <h2 className="text-xl text-green-500">
                by{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={pkg?.github_repo_url.replace(repoDetails.name, '')}
                >
                  {repoDetails.owner_name}
                </a>
              </h2>
              <p className="text-gray-400">
                Latest <b>V {pkg.version}</b> :{' '}
                {dayjs(repoDetails.pushed_at).format('MMMM D, YYYY h:mm A')}
              </p>
              <section className="flex gap-1 mt-4 flex-wrap">
                {repoDetails.tags.map((tag: string) => (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                ))}
              </section>
              <p className="mt-4 text-gray-500">{repoDetails.description}</p>
            </section>
            <section className="md:w-1/5">
              <GithubStats
                slug={pkg.slug}
                watchers={repoDetails.watch_count}
                stars={repoDetails.stargazers_count}
                issues={repoDetails.open_issues_count}
              />
            </section>
          </article>
        )}
        {!repoDetails && (
          <div className="alert shadow-lg">
            <div>
              <span>Sorry! Github repo was not found</span>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user, repo } = context.params as { [key: string]: string }
  const slug = [user, repo].join('/')
  const pkg = getPackageBySlug(slug)
  const repoDetails = await getRepoDetails(slug)

  return {
    props: {
      pkg,
      repoDetails,
    },
  }
}

export default RepoPage
