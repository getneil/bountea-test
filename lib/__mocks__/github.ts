import { RepoDetailsType, RepoContributor, RepoIssue } from '../../types'

export async function getRepoDetails(
  slug: string
): Promise<RepoDetailsType | null> {
  const repoDetail: RepoDetailsType = {
    id: 123123,
    name: 'mock repo',
    description: 'lorem ipsum dolor sit amerg',
    owner_name: '0wner',
    owner_picture_url: 'https://google.com',
    open_issues_count: 1,
    stargazers_count: 2,
    watch_count: 3,
    tags: ['tag1', 'tag2', 'tag3'],
    pushed_at: new Date().toString(),
  }
  return repoDetail
}

export async function getContributors(
  slug: string
): Promise<RepoContributor[]> {
  return [
    {
      id: 123,
      name: 'c0mrade',
      avatar_url: 'https://google.com',
      site_admin: false,
    },
    {
      id: 124,
      name: 'Phiber',
      avatar_url: 'https://google.com',
      site_admin: true,
    },
    {
      id: 125,
      name: 'Phoenix',
      avatar_url: 'https://google.com',
      site_admin: false,
    },
  ] as RepoContributor[]
}

export async function getIssues(slug: string): Promise<RepoIssue[]> {
  return [
    {
      id: 1,
      title: 'first issue',
      body: '1 issue body',
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
      state: 'OPEN',
      issue_number: 1,
      author: 'c0mrade',
      author_avatar_url: 'https://google.com',
      bountea: 30,
    },
    {
      id: 2,
      title: 'Highest bounty issue',
      body: '2 issue body',
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
      state: 'OPEN',
      issue_number: 1,
      author: 'Zaig0ne',
      author_avatar_url: 'https://google.com',
      bountea: 65,
    },
    {
      id: 3,
      title: 'third issue',
      body: '3 issue body',
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
      state: 'OPEN',
      issue_number: 1,
      author: 'Exodoes',
      author_avatar_url: 'https://google.com',
      bountea: 10,
    },
  ]
}
