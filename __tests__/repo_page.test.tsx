import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import RepoPage from '@/pages/[user]/[repo].tsx'
import { getPackageBySlug } from '../lib/db'
import { getRepoDetails, getContributors, getIssues } from '../lib/github'

import { testId as ghContributorId } from '../components/GithubContributor'
import { testId as ghIssueId } from '../components/GithubIssue'
jest.mock('../lib/db')
jest.mock('../lib/github')

describe('Repo Details Page', () => {
  it('should render repo details', async () => {
    const slug = 'leesavide/abcm2ps'
    const pkg = getPackageBySlug(slug)
    const [details, contributors] = await Promise.all([
      getRepoDetails(slug),
      getContributors(slug),
    ])

    render(
      <RepoPage
        pkg={pkg}
        details={details}
        contributors={contributors}
        issues={[]}
      />
    )

    const repoName = screen.getByText(details.name)
    const ownerName = screen.getByText(details?.owner_name)

    expect(repoName).toBeInTheDocument()
    expect(ownerName).toBeInTheDocument()
  })
  it('should render the contributors', async () => {
    const slug = 'leesavide/abcm2ps'
    const pkg = getPackageBySlug(slug)
    const [details, contributors] = await Promise.all([
      getRepoDetails(slug),
      getContributors(slug),
    ])

    render(
      <RepoPage
        pkg={pkg}
        details={details}
        contributors={contributors}
        issues={[]}
      />
    )

    const contributorsRendered = screen.getAllByTestId(ghContributorId)

    expect(contributorsRendered).toHaveLength(3)
  })
  it('should render the issues: max 2 and highest bounty should displayed', async () => {
    const slug = 'leesavide/abcm2ps'
    const pkg = getPackageBySlug(slug)
    const [details, issues] = await Promise.all([
      getRepoDetails(slug),
      getIssues(slug),
    ])
    expect(issues).toHaveLength(3)

    render(
      <RepoPage pkg={pkg} details={details} contributors={[]} issues={issues} />
    )

    const issuesRendered = screen.getAllByTestId(ghIssueId)

    expect(issuesRendered).toHaveLength(2)

    const highestBounteaIssue = screen.getByText('Highest bounty issue')
    expect(highestBounteaIssue).toBeInTheDocument()
  })
  afterAll(() => {
    jest.unmock('../lib/db')
    jest.unmock('../lib/github')
  })
})
