import type { NextPage, GetServerSideProps } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {
  PackageType,
  RepoDetailsType,
  RepoContributor,
  RepoIssue,
} from '../../types/index'
import { getPackageBySlug } from '../../lib/db'
import { getRepoDetails, getContributors, getIssues } from '../../lib/github'
import dayjs from 'dayjs'
import GithubStats from '../../components/GithubStats'
import GithubContributor from '../../components/GithubContributor'
import GithubIssues from '../../components/GithubIssue'
import RepoCta from '../../components/RepoCta'
interface RepoPageProps {
  pkg?: PackageType
  details?: RepoDetailsType
  contributors: RepoContributor[]
  issues: RepoIssue[]
}

const RepoPage: NextPage<RepoPageProps> = ({
  pkg, // note: `package` is reserved word unfortunately
  details,
  contributors,
  issues,
}: RepoPageProps) => {
  return (
    <>
      <Head>
        <title>BounTea | {pkg?.name || 'Not Found'}</title>
        <meta name="description" content={pkg?.desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="p-4 md:p-0 min-h-screen">
        {details && pkg && (
          <>
            <article className="mt-12 mb-4 flex flex-col md:flex-row  card bg-white p-8 shadow-lg">
              <section className="flex-grow">
                <h1 className="text-3xl md:text-5xl text-green-700">
                  {details.name}
                </h1>
                <h2 className="text-xl text-green-500">
                  by{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={pkg?.github_repo_url.replace(details.name, '')}
                  >
                    {details.owner_name}
                  </a>
                </h2>
                <p className="text-gray-400">
                  Latest <b>V {pkg.version}</b> :{' '}
                  {dayjs(details.pushed_at).format('MMMM D, YYYY h:mm A')}
                </p>
                <section className="flex gap-1 mt-4 flex-wrap">
                  {details.tags.map((tag: string) => (
                    <span key={tag} className="badge">
                      {tag}
                    </span>
                  ))}
                </section>
                <p className="mt-4 text-gray-500">{details.description}</p>
              </section>
              <section className="md:w-1/5">
                <GithubStats
                  slug={pkg.slug}
                  watchers={details.watch_count}
                  stars={details.stargazers_count}
                  issues={details.open_issues_count}
                />
              </section>
            </article>
            <ContributorsPanel contributors={contributors} />
            <IssuesPanel
              issues={issues}
              activated={pkg.is_bountea_registered}
              slug={pkg.slug}
            />
          </>
        )}
        {!details && (
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

function ContributorsPanel({
  contributors,
}: {
  contributors: RepoContributor[]
}) {
  const limit = 9
  const [showAll, setShowAll] = useState<boolean>(false)
  const sortedSliced = contributors
    .sort((a, b) => Number(b.site_admin) - Number(a.site_admin))
    .slice(0, showAll ? contributors.length : limit)

  return (
    <section className="mb-4">
      <h3 className="text-lg my-4 font-semibold">
        Contributors ( {contributors.length} )
      </h3>
      <ul className="grid gap-2 grid-cols-3 md:grid-cols-none md:flex flex-wrap">
        {sortedSliced.map((user) => (
          <GithubContributor key={user.id} user={user} />
        ))}
      </ul>
      {contributors.length > limit && (
        <div
          onClick={() => setShowAll(!showAll)}
          className="mt-2 float-right btn btn-outline btn-sm"
        >
          {!showAll ? `show more ( ${contributors.length - limit} )` : 'less'}
        </div>
      )}
    </section>
  )
}

function IssuesPanel({
  issues,
  slug,
  activated,
}: {
  issues: RepoIssue[]
  slug: string
  activated: boolean
}) {
  const limit = 2
  const [showAll, setShowAll] = useState<boolean>(false)
  const sortedSliced = issues
    .sort((a, b) => {
      return activated
        ? Number(b.bountea) - Number(a.bountea)
        : +new Date(b.updated_at) - +new Date(a.updated_at)
    })
    .slice(0, showAll ? issues.length : limit)

  const totalBountea = issues.reduce((a, b) => a + b.bountea, 0)

  return (
    <section className="mt-16">
      <h3 className="text-lg my-4 font-semibold">Issues ( {issues.length} )</h3>
      <ul className="gap-2 flex flex-col">
        <RepoCta
          issueCount={issues.length}
          bountea={totalBountea}
          slug={slug}
          activated={activated}
        />
        {sortedSliced.map((issue) => (
          <GithubIssues
            key={issue.id}
            issue={issue}
            slug={slug}
            activated={activated}
          />
        ))}
      </ul>
      {issues.length > limit && (
        <div
          onClick={() => setShowAll(!showAll)}
          className="mt-2 float-right btn btn-outline btn-sm"
        >
          {!showAll ? `show more ( ${issues.length - limit} )` : 'less'}
        </div>
      )}
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user, repo } = context.params as { [key: string]: string }
  const slug = [user, repo].join('/')
  const pkg = getPackageBySlug(slug)
  const [details, contributors, issues] = await Promise.all([
    getRepoDetails(slug),
    getContributors(slug),
    getIssues(slug),
  ])

  return {
    props: {
      pkg,
      details,
      contributors,
      issues,
    },
  }
}

export default RepoPage
