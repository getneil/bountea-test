import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import RepoPage from '@/pages/[user]/[repo].tsx'
import { getPackageBySlug } from '../lib/db'
import { getRepoDetails, getContributors } from '../lib/github'

import { testId as ghContributorId } from '../components/GithubContributor'
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
      <RepoPage pkg={pkg} repoDetails={details} contributors={contributors} />
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
      <RepoPage pkg={pkg} repoDetails={details} contributors={contributors} />
    )

    const contributorsRendered = screen.getAllByTestId(ghContributorId)

    expect(contributorsRendered).toHaveLength(3)
  })
  afterAll(() => {
    jest.unmock('../lib/db')
    jest.unmock('../lib/github')
  })
})
