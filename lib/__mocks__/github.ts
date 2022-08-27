import { RepoDetailsType, RepoContributor } from '../../types'

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
