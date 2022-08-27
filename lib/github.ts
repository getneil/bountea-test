import axios from 'axios'
import { RepoDetailsType, RepoContributor, RepoIssue } from '../types'
import _ from 'lodash'
const githubAccessToken = process.env.GITHUB_TOKEN

async function githubRequest(slug: string, prop?: string): Promise<any | null> {
  try {
    const url = ['https://api.github.com/repos', slug]
    if (prop) url.push(prop)
    const { data } = await axios.get(url.join('/'), {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `token ${githubAccessToken}`,
      },
    })
    if (!data) throw new Error(`github: ${slug} not found`)

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getRepoDetails(
  slug: string
): Promise<RepoDetailsType | null> {
  const data = await githubRequest(slug)
  if (!data) return null

  const repoDetail: RepoDetailsType = {
    id: data.id,
    name: data.name,
    description: data.description,
    owner_name: _.get(data, 'owner.login', ''),
    owner_picture_url: _.get(data, 'owner.avatar_url', ''),
    open_issues_count: data.open_issues_count,
    stargazers_count: data.stargazers_count,
    watch_count: data.subscribers_count,
    tags: [...data.topics, data.language],
    pushed_at: data.pushed_at,
  }
  return repoDetail
}

export async function getContributors(
  slug: string
): Promise<RepoContributor[]> {
  const users = await githubRequest(slug, 'contributors')
  const contributors: RepoContributor[] = !Array.isArray(users)
    ? []
    : users.map(
        (user) =>
          ({
            id: user.id,
            name: user.login,
            avatar_url: user.avatar_url,
            site_admin: user.site_admin,
          } as RepoContributor)
      )

  return contributors
}

export async function getIssues(slug: string): Promise<RepoIssue[]> {
  const rawIssues = await githubRequest(slug, 'issues')
  const issues: RepoIssue[] = !Array.isArray(rawIssues)
    ? []
    : rawIssues.map(
        (issue) =>
          ({
            ..._.pick(issue, [
              'id',
              'title',
              'body',
              'created_at',
              'updated_at',
              'state',
            ]),
            issue_number: issue.number,
            author: issue.user.login,
            author_avatar_url: issue.user.avatar_url,
            bountea: _.random(0, 67),
          } as RepoIssue)
      )

  return issues
}
