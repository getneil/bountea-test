import axios from 'axios'
import { RepoDetailsType } from '../types'
import _ from 'lodash'
const githubAccessToken = process.env.GITHUB_TOKEN

export async function githubRequest(
  slug: string,
  prop?: string
): Promise<any | null> {
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
