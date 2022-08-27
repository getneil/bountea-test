export interface PackageType {
  name: string
  full_name: string
  homepage: string
  desc: string
  version: string
  github_repo_url: string
  github_repo_api_url: string
  slug: string
  is_bountea_registered: boolean
  bountea: number
}

export interface RepoDetailsType {
  id: number
  name: string
  description: string // description
  owner_name: string
  owner_picture_url: string
  open_issues_count: number // open_issues_count
  stargazers_count: number // stargazers_count
  watch_count: number // subscribers_count
  tags: string[] // topics[], language
  pushed_at: string
}

export interface RepoContributor {
  id: number
  name: string
  avatar_url: string
  site_admin: boolean
}

export interface RepoIssue {
  id: number
  issue_number: number
  title: string
  body: string
  created_at: string
  updated_at: string
  state: string
  author: string
  author_avatar_url: string
  bountea: number
}
